import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import AddHomeWorkRoundedIcon from '@mui/icons-material/AddHomeWorkRounded';
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { AppButton, EmptyState, LoadingScreen, PageHeader, SectionCard } from '@/components';
import { useViewer } from '@/viewer/hooks';
import { ViewerProvider, ViewerWorkspace } from '@/viewer';
import {
  ProjectHierarchyTree,
  ProjectPropertiesPanel,
} from '@/features/projects/components';
import { ProjectScene } from '@/features/projects/viewer/ProjectScene';
import { useProjectWorkspaceStore } from '@/features/projects/store';

function ProjectWorkspaceContent({ projectId }: { projectId: string }) {
  const navigate = useNavigate();
  const { setSelection, clearSelection } = useViewer();

  const activeProject = useProjectWorkspaceStore((state) => state.activeProject);
  const selection = useProjectWorkspaceStore((state) => state.selection);
  const status = useProjectWorkspaceStore((state) => state.status);
  const error = useProjectWorkspaceStore((state) => state.error);
  const loadProject = useProjectWorkspaceStore((state) => state.loadProject);
  const createBuilding = useProjectWorkspaceStore((state) => state.createBuilding);
  const createFloor = useProjectWorkspaceStore((state) => state.createFloor);
  const createRoom = useProjectWorkspaceStore((state) => state.createRoom);
  const updateRoom = useProjectWorkspaceStore((state) => state.updateRoom);
  const selectBuilding = useProjectWorkspaceStore((state) => state.selectBuilding);
  const selectFloor = useProjectWorkspaceStore((state) => state.selectFloor);
  const selectRoom = useProjectWorkspaceStore((state) => state.selectRoom);
  const getSelectedRoom = useProjectWorkspaceStore((state) => state.getSelectedRoom);

  useEffect(() => {
    let isActive = true;

    void loadProject(projectId).then((project) => {
      if (!isActive) {
        return;
      }

      if (!project) {
        navigate('/projects', { replace: true });
      }
    });

    return () => {
      isActive = false;
    };
  }, [loadProject, navigate, projectId]);

  useEffect(() => {
    if (!activeProject) {
      clearSelection();
      return;
    }

    if (selection.roomId) {
      setSelection([selection.roomId], selection.roomId);
      return;
    }

    if (selection.floorId) {
      setSelection([selection.floorId], selection.floorId);
      return;
    }

    if (selection.buildingId) {
      setSelection([selection.buildingId], selection.buildingId);
      return;
    }

    clearSelection();
  }, [activeProject, clearSelection, selection.buildingId, selection.floorId, selection.roomId, setSelection]);

  const selectedRoom = getSelectedRoom();

  if (status === 'loading' && !activeProject) {
    return <LoadingScreen fullScreen message="Loading project workspace..." />;
  }

  if (!activeProject) {
    return (
      <EmptyState
        title="Project unavailable"
        description={error ?? 'The project could not be loaded.'}
        action={
          <AppButton variant="contained" onClick={() => navigate('/projects')}>
            Back to projects
          </AppButton>
        }
      />
    );
  }

  const buildingCount = activeProject.buildings.length;
  const floorCount = activeProject.buildings.reduce((total, building) => total + building.floors.length, 0);
  const roomCount = activeProject.buildings.reduce(
    (total, building) => total + building.floors.reduce((floorTotal, floor) => floorTotal + floor.rooms.length, 0),
    0,
  );

  return (
    <Stack spacing={3}>
      <PageHeader
        eyebrow="Project workspace"
        title={activeProject.name}
        description={activeProject.description}
        actions={
          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <AppButton startIcon={<ArrowBackRoundedIcon />} variant="outlined" onClick={() => navigate('/projects')}>
              Back
            </AppButton>
            <AppButton
              startIcon={<AddBusinessRoundedIcon />}
              variant="contained"
              onClick={() => {
                void createBuilding();
              }}
            >
              Building
            </AppButton>
            <AppButton
              startIcon={<AddHomeWorkRoundedIcon />}
              variant="contained"
              onClick={() => {
                void createFloor();
              }}
            >
              Floor
            </AppButton>
            <AppButton
              startIcon={<ChairRoundedIcon />}
              variant="contained"
              onClick={() => {
                void createRoom();
              }}
            >
              Room
            </AppButton>
          </Stack>
        }
      />

      <SectionCard>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Typography variant="body2" color="text.secondary">
            Buildings: {buildingCount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Floors: {floorCount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rooms: {roomCount}
          </Typography>
          {typeof activeProject.plotWidth === 'number' ? (
            <Typography variant="body2" color="text.secondary">
              Plot width: {activeProject.plotWidth} m
            </Typography>
          ) : null}
          {typeof activeProject.plotLength === 'number' ? (
            <Typography variant="body2" color="text.secondary">
              Plot length: {activeProject.plotLength} m
            </Typography>
          ) : null}
        </Stack>
      </SectionCard>

      <ViewerWorkspace
        toolbar={
          <Typography variant="body2" color="text.secondary">
            Working with a local project workspace. Room dimensions are in meters and the scene updates from domain state.
          </Typography>
        }
        leftPanel={
          <ProjectHierarchyTree
            project={activeProject}
            selectedBuildingId={selection.buildingId}
            selectedFloorId={selection.floorId}
            selectedRoomId={selection.roomId}
            onSelectBuilding={selectBuilding}
            onSelectFloor={selectFloor}
            onSelectRoom={selectRoom}
          />
        }
        rightPanel={
          <ProjectPropertiesPanel
            key={selectedRoom?.id ?? 'no-room'}
            room={selectedRoom}
            onUpdateRoom={(roomId, patch) => void updateRoom(roomId, patch)}
          />
        }
        bottomPanel={
          <Typography variant="body2" color="text.secondary">
            Building hierarchy and room properties are persisted locally after every change.
          </Typography>
        }
        scene={<ProjectScene project={activeProject} selectedRoomId={selection.roomId} onSelectRoom={selectRoom} />}
        rightPanelTitle="Properties panel"
        bottomPanelTitle="Persistence"
      />
    </Stack>
  );
}

export default function ProjectWorkspacePage() {
  const { projectId } = useParams();

  if (!projectId) {
    return (
      <EmptyState
        title="Missing project"
      description="The project workspace route needs a project id."
      action={
          <AppButton variant="contained" component={RouterLink} to="/projects">
            Back to projects
          </AppButton>
        }
      />
    );
  }

  return (
    <ViewerProvider>
      <ProjectWorkspaceContent projectId={projectId} />
    </ViewerProvider>
  );
}
