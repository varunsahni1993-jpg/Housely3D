import { z } from 'zod';
import {
  normalizeProject,
  normalizeProjects,
  type Project,
  type StableId,
} from '@/features/projects/domain';

export interface ProjectRepository {
  listProjects: () => Promise<Project[]>;
  getProject: (projectId: StableId) => Promise<Project | null>;
  saveProject: (project: Project) => Promise<Project>;
  deleteProject: (projectId: StableId) => Promise<void>;
}

interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

interface ProjectRepositoryPayload {
  version: 1;
  projects: Project[];
}

const repositoryPayloadSchema = z.object({
  version: z.literal(1),
  projects: z.array(z.unknown()),
});

const DEFAULT_STORAGE_KEY = 'housely-3d-projects';

function getBrowserStorage(): StorageLike | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readPayload(storage: StorageLike | null, storageKey: string): ProjectRepositoryPayload {
  if (!storage) {
    return { version: 1, projects: [] };
  }

  try {
    const raw = storage.getItem(storageKey);

    if (!raw) {
      return { version: 1, projects: [] };
    }

    const parsed = JSON.parse(raw) as unknown;
    const validated = repositoryPayloadSchema.safeParse(parsed);

    if (!validated.success) {
      return { version: 1, projects: [] };
    }

    return {
      version: 1,
      projects: normalizeProjects(validated.data.projects),
    };
  } catch {
    return { version: 1, projects: [] };
  }
}

function writePayload(storage: StorageLike | null, storageKey: string, payload: ProjectRepositoryPayload): void {
  if (!storage) {
    return;
  }

  storage.setItem(storageKey, JSON.stringify(payload));
}

export function createProjectRepository(storage: StorageLike | null = getBrowserStorage(), storageKey = DEFAULT_STORAGE_KEY): ProjectRepository {
  return {
    async listProjects() {
      const payload = readPayload(storage, storageKey);
      return [...payload.projects];
    },
    async getProject(projectId: StableId) {
      const payload = readPayload(storage, storageKey);
      return payload.projects.find((project) => project.id === projectId) ?? null;
    },
    async saveProject(project: Project) {
      const existingPayload = readPayload(storage, storageKey);
      const nextProjects = existingPayload.projects.filter((entry) => entry.id !== project.id);
      const normalizedProject = normalizeProject(project);

      if (!normalizedProject) {
        throw new Error('Cannot save an invalid project record.');
      }

      nextProjects.unshift(normalizedProject);
      writePayload(storage, storageKey, {
        version: 1,
        projects: nextProjects,
      });

      return normalizedProject;
    },
    async deleteProject(projectId: StableId) {
      const existingPayload = readPayload(storage, storageKey);
      const nextProjects = existingPayload.projects.filter((entry) => entry.id !== projectId);
      writePayload(storage, storageKey, {
        version: 1,
        projects: nextProjects,
      });
    },
  };
}

export const projectRepository = createProjectRepository();
