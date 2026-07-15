import { create } from 'zustand';
import {
  addBuildingToProject,
  addFloorToBuilding,
  addRoomToProject,
  createBuildingDraft,
  createFloorDraft,
  createProjectDraft,
  createRoomDraft,
  findBuildingById,
  findFloorById,
  findRoomById,
  resolveBuildingSelection,
  resolveFloorSelection,
  resolveRoomSelection,
  removeBuildingFromProject,
  removeFloorFromProject,
  removeRoomFromProject,
  type Building,
  type CreateBuildingInput,
  type CreateFloorInput,
  type CreateProjectInput,
  type CreateRoomInput,
  type Floor,
  type Project,
  type ProjectSelection,
  type StableId,
  type UpdateBuildingInput,
  type UpdateFloorInput,
  type UpdateProjectInput,
  type UpdateRoomInput,
  updateBuildingRecord,
  updateFloorRecord,
  updateProjectRecord,
  updateRoomRecord,
} from '@/features/projects/domain';
import { projectRepository, type ProjectRepository } from '@/features/projects/repository';

type WorkspaceStatus = 'idle' | 'loading' | 'ready' | 'error';

interface ProjectWorkspaceState {
  readonly projects: Project[];
  readonly activeProject: Project | null;
  readonly activeProjectId: StableId | null;
  readonly selection: ProjectSelection;
  readonly status: WorkspaceStatus;
  readonly error: string | null;
  loadProjects: () => Promise<Project[]>;
  createProject: (input: CreateProjectInput) => Promise<Project>;
  loadProject: (projectId: StableId) => Promise<Project | null>;
  updateProject: (projectId: StableId, patch: UpdateProjectInput) => Promise<Project | null>;
  deleteProject: (projectId: StableId) => Promise<void>;
  createBuilding: (input?: CreateBuildingInput) => Promise<Building | null>;
  updateBuilding: (buildingId: StableId, patch: UpdateBuildingInput) => Promise<Building | null>;
  deleteBuilding: (buildingId: StableId) => Promise<void>;
  createFloor: (input?: CreateFloorInput) => Promise<Floor | null>;
  updateFloor: (floorId: StableId, patch: UpdateFloorInput) => Promise<Floor | null>;
  deleteFloor: (floorId: StableId) => Promise<void>;
  createRoom: (input?: CreateRoomInput) => Promise<void>;
  updateRoom: (roomId: StableId, patch: UpdateRoomInput) => Promise<void>;
  deleteRoom: (roomId: StableId) => Promise<void>;
  selectBuilding: (buildingId: StableId | null) => void;
  selectFloor: (floorId: StableId | null) => void;
  selectRoom: (roomId: StableId | null) => void;
  clearSelection: () => void;
  getSelectedBuilding: () => Building | null;
  getSelectedFloor: () => Floor | null;
  getSelectedRoom: () => ReturnType<typeof findRoomById>;
}

function replaceProject(currentProjects: Project[], project: Project): Project[] {
  const withoutCurrent = currentProjects.filter((entry) => entry.id !== project.id);
  return [project, ...withoutCurrent];
}

function appendProject(currentProjects: Project[], project: Project): Project[] {
  return [project, ...currentProjects.filter((entry) => entry.id !== project.id)];
}

function removeProject(currentProjects: Project[], projectId: StableId): Project[] {
  return currentProjects.filter((entry) => entry.id !== projectId);
}

function findProject(currentProjects: Project[], projectId: StableId): Project | null {
  return currentProjects.find((project) => project.id === projectId) ?? null;
}

function createSelection(): ProjectSelection {
  return {
    buildingId: null,
    floorId: null,
    roomId: null,
  };
}

export function createProjectWorkspaceStore(repository: ProjectRepository = projectRepository) {
  return create<ProjectWorkspaceState>()((set, get) => ({
    projects: [],
    activeProject: null,
    activeProjectId: null,
    selection: createSelection(),
    status: 'idle',
    error: null,
    loadProjects: async () => {
      set({ status: 'loading', error: null });
      try {
        const projects = await repository.listProjects();
        const sortedProjects = [...projects].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

        set({
          projects: sortedProjects,
          status: 'ready',
        });

        return sortedProjects;
      } catch (error) {
        set({
          status: 'error',
          error: error instanceof Error ? error.message : 'Unable to load projects.',
        });
        return [];
      }
    },
    createProject: async (input) => {
      const project = createProjectDraft(input);

      try {
        const savedProject = await repository.saveProject(project);
        set((state) => ({
          projects: appendProject(state.projects, savedProject),
          activeProject: savedProject,
          activeProjectId: savedProject.id,
          selection: createSelection(),
          status: 'ready',
          error: null,
        }));

        return savedProject;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to create project.';
        set({ status: 'error', error: message });
        throw error;
      }
    },
    loadProject: async (projectId) => {
      set({ status: 'loading', error: null });

      try {
        const project = await repository.getProject(projectId);

        if (!project) {
          set({
            activeProject: null,
            activeProjectId: null,
            selection: createSelection(),
            status: 'error',
            error: 'Project was not found.',
          });
          return null;
        }

        set((state) => ({
          projects: replaceProject(state.projects, project),
          activeProject: project,
          activeProjectId: project.id,
          selection: createSelection(),
          status: 'ready',
          error: null,
        }));

        return project;
      } catch (error) {
        set({
          activeProject: null,
          activeProjectId: null,
          selection: createSelection(),
          status: 'error',
          error: error instanceof Error ? error.message : 'Unable to load project.',
        });
        return null;
      }
    },
    updateProject: async (projectId, patch) => {
      const current = get().activeProject?.id === projectId ? get().activeProject : findProject(get().projects, projectId);

      if (!current) {
        return null;
      }

      const updatedProject = updateProjectRecord(current, patch);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: state.activeProjectId === projectId ? savedProject : state.activeProject,
          error: null,
          status: 'ready',
        }));

        return savedProject;
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to update project.' });
        return null;
      }
    },
    deleteProject: async (projectId) => {
      try {
        await repository.deleteProject(projectId);
        set((state) => {
          const remainingProjects = removeProject(state.projects, projectId);
          const isActiveProject = state.activeProjectId === projectId;

          return {
            projects: remainingProjects,
            activeProject: isActiveProject ? null : state.activeProject,
            activeProjectId: isActiveProject ? null : state.activeProjectId,
            selection: isActiveProject ? createSelection() : state.selection,
            status: 'ready',
            error: null,
          };
        });
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to delete project.' });
      }
    },
    createBuilding: async (input) => {
      const activeProject = get().activeProject;

      if (!activeProject) {
        return null;
      }

      const building = createBuildingDraft(input, activeProject.buildings.length);
      const updatedProject = addBuildingToProject(activeProject, building);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: savedProject,
          activeProjectId: savedProject.id,
          selection: {
            buildingId: building.id,
            floorId: null,
            roomId: null,
          },
          status: 'ready',
          error: null,
        }));

        return building;
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to create building.' });
        return null;
      }
    },
    updateBuilding: async (buildingId, patch) => {
      const activeProject = get().activeProject;

      if (!activeProject) {
        return null;
      }

      const updatedProject = updateBuildingRecord(activeProject, buildingId, patch);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: savedProject,
          status: 'ready',
          error: null,
        }));

        return findBuildingById(savedProject, buildingId);
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to update building.' });
        return null;
      }
    },
    deleteBuilding: async (buildingId) => {
      const activeProject = get().activeProject;

      if (!activeProject) {
        return;
      }

      const updatedProject = removeBuildingFromProject(activeProject, buildingId);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: savedProject,
          selection:
            state.selection.buildingId === buildingId
              ? createSelection()
              : state.selection,
          status: 'ready',
          error: null,
        }));
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to delete building.' });
      }
    },
    createFloor: async (input) => {
      const activeProject = get().activeProject;

      if (!activeProject) {
        return null;
      }

      const selectedBuildingId = get().selection.buildingId ?? activeProject.buildings[0]?.id ?? null;

      if (!selectedBuildingId) {
        return null;
      }

      const building = findBuildingById(activeProject, selectedBuildingId);

      if (!building) {
        return null;
      }

      const floor = createFloorDraft(input, building.floors.length);
      const updatedProject = addFloorToBuilding(activeProject, selectedBuildingId, floor);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: savedProject,
          activeProjectId: savedProject.id,
          selection: {
            buildingId: selectedBuildingId,
            floorId: floor.id,
            roomId: null,
          },
          status: 'ready',
          error: null,
        }));

        return floor;
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to create floor.' });
        return null;
      }
    },
    updateFloor: async (floorId, patch) => {
      const activeProject = get().activeProject;

      if (!activeProject) {
        return null;
      }

      const updatedProject = updateFloorRecord(activeProject, floorId, patch);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: savedProject,
          status: 'ready',
          error: null,
        }));

        return findFloorById(savedProject, floorId);
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to update floor.' });
        return null;
      }
    },
    deleteFloor: async (floorId) => {
      const activeProject = get().activeProject;

      if (!activeProject) {
        return;
      }

      const updatedProject = removeFloorFromProject(activeProject, floorId);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: savedProject,
          selection: state.selection.floorId === floorId ? createSelection() : state.selection,
          status: 'ready',
          error: null,
        }));
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to delete floor.' });
      }
    },
    createRoom: async (input) => {
      const activeProject = get().activeProject;

      if (!activeProject) {
        return;
      }

      const selectedFloorId = get().selection.floorId ?? activeProject.buildings[0]?.floors[0]?.id ?? null;

      if (!selectedFloorId) {
        return;
      }

      const floor = findFloorById(activeProject, selectedFloorId);

      if (!floor) {
        return;
      }

      const room = createRoomDraft(input, floor.rooms.length);
      const updatedProject = addRoomToProject(activeProject, selectedFloorId, room);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: savedProject,
          activeProjectId: savedProject.id,
          selection: {
            buildingId: get().selection.buildingId ?? activeProject.buildings[0]?.id ?? null,
            floorId: selectedFloorId,
            roomId: room.id,
          },
          status: 'ready',
          error: null,
        }));
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to create room.' });
      }
    },
    updateRoom: async (roomId, patch) => {
      const activeProject = get().activeProject;

      if (!activeProject) {
        return;
      }

      const updatedProject = updateRoomRecord(activeProject, roomId, patch);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: savedProject,
          status: 'ready',
          error: null,
        }));
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to update room.' });
      }
    },
    deleteRoom: async (roomId) => {
      const activeProject = get().activeProject;

      if (!activeProject) {
        return;
      }

      const updatedProject = removeRoomFromProject(activeProject, roomId);

      try {
        const savedProject = await repository.saveProject(updatedProject);
        set((state) => ({
          projects: replaceProject(state.projects, savedProject),
          activeProject: savedProject,
          selection: state.selection.roomId === roomId ? createSelection() : state.selection,
          status: 'ready',
          error: null,
        }));
      } catch (error) {
        set({ status: 'error', error: error instanceof Error ? error.message : 'Unable to delete room.' });
      }
    },
    selectBuilding: (buildingId) => {
      const activeProject = get().activeProject;

      if (!buildingId || !activeProject) {
        set({ selection: createSelection() });
        return;
      }

      set({ selection: resolveBuildingSelection(activeProject, buildingId) });
    },
    selectFloor: (floorId) => {
      const activeProject = get().activeProject;

      if (!floorId || !activeProject) {
        set({ selection: createSelection() });
        return;
      }

      set({ selection: resolveFloorSelection(activeProject, floorId) });
    },
    selectRoom: (roomId) => {
      const activeProject = get().activeProject;

      if (!roomId || !activeProject) {
        set({ selection: createSelection() });
        return;
      }

      set({ selection: resolveRoomSelection(activeProject, roomId) });
    },
    clearSelection: () => {
      set({ selection: createSelection() });
    },
    getSelectedBuilding: () => {
      const state = get();
      if (!state.activeProject || !state.selection.buildingId) {
        return null;
      }
      return findBuildingById(state.activeProject, state.selection.buildingId);
    },
    getSelectedFloor: () => {
      const state = get();
      if (!state.activeProject || !state.selection.floorId) {
        return null;
      }
      return findFloorById(state.activeProject, state.selection.floorId);
    },
    getSelectedRoom: () => {
      const state = get();
      if (!state.activeProject || !state.selection.roomId) {
        return null;
      }
      return findRoomById(state.activeProject, state.selection.roomId);
    },
  }));
}

export const useProjectWorkspaceStore = createProjectWorkspaceStore();
