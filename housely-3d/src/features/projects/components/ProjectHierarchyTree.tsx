import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EmptyState } from '@/components';
import type { Project } from '@/features/projects/domain';

interface ProjectHierarchyTreeProps {
  project: Project | null;
  selectedBuildingId: string | null;
  selectedFloorId: string | null;
  selectedRoomId: string | null;
  onSelectBuilding: (buildingId: string) => void;
  onSelectFloor: (floorId: string) => void;
  onSelectRoom: (roomId: string) => void;
}

function TreeRow({
  label,
  active,
  indent,
  onClick,
}: {
  label: string;
  active?: boolean;
  indent: number;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant={active ? 'contained' : 'text'}
      color={active ? 'primary' : 'inherit'}
      size="small"
      sx={{
        justifyContent: 'flex-start',
        pl: indent,
        textTransform: 'none',
        minWidth: 0,
        width: '100%',
      }}
    >
      {label}
    </Button>
  );
}

export function ProjectHierarchyTree({
  project,
  selectedBuildingId,
  selectedFloorId,
  selectedRoomId,
  onSelectBuilding,
  onSelectFloor,
  onSelectRoom,
}: ProjectHierarchyTreeProps) {
  if (!project) {
    return (
      <EmptyState
        title="No project loaded"
        description="Open a project from the Projects page to inspect the hierarchy."
      />
    );
  }

  return (
    <Stack spacing={1.5}>
      <Box>
        <Typography variant="subtitle1" fontWeight={700}>
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
      </Box>

      <Stack spacing={1}>
        {project.buildings.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No buildings yet. Use the toolbar to create the first building.
          </Typography>
        ) : null}

        {project.buildings.map((building) => (
          <Stack key={building.id} spacing={0.5}>
            <TreeRow label={building.name} active={selectedBuildingId === building.id} indent={0} onClick={() => onSelectBuilding(building.id)} />
            {building.floors.map((floor) => (
              <Stack key={floor.id} spacing={0.25}>
                <TreeRow label={floor.name} active={selectedFloorId === floor.id} indent={2} onClick={() => onSelectFloor(floor.id)} />
                {floor.rooms.map((room) => (
                  <TreeRow key={room.id} label={`${room.name} (${room.type})`} active={selectedRoomId === room.id} indent={4} onClick={() => onSelectRoom(room.id)} />
                ))}
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
