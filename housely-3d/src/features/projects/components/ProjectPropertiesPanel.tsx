import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EmptyState, AppTextField, SectionCard } from '@/components';
import type { Room, UpdateRoomInput } from '@/features/projects/domain';

interface ProjectPropertiesPanelProps {
  room: Room | null;
  onUpdateRoom: (roomId: string, patch: UpdateRoomInput) => void;
}

function toNumberOrUndefined(value: string): number | undefined {
  if (value.trim() === '') {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function ProjectPropertiesPanel({ room, onUpdateRoom }: ProjectPropertiesPanelProps) {
  if (!room) {
    return (
      <EmptyState
        title="No room selected"
        description="Select a room in the hierarchy or the 3D view to edit its properties."
      />
    );
  }

  return (
    <SectionCard description="Room dimensions are stored in meters and update the 3D view immediately.">
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={700}>
          {room.name}
        </Typography>

        <AppTextField
          label="Name"
          defaultValue={room.name}
          onChange={(event) => onUpdateRoom(room.id, { name: event.target.value })}
        />

        <AppTextField
          label="Type"
          defaultValue={room.type}
          onChange={(event) => onUpdateRoom(room.id, { type: event.target.value })}
        />

        <AppTextField
          label="Width (m)"
          name="width"
          type="number"
          inputProps={{ min: 0.1, step: 0.1 }}
          defaultValue={room.width}
          onChange={(event) => {
            const nextValue = toNumberOrUndefined(event.target.value);
            if (typeof nextValue === 'number') {
              onUpdateRoom(room.id, { width: nextValue });
            }
          }}
        />

        <AppTextField
          label="Length (m)"
          name="length"
          type="number"
          inputProps={{ min: 0.1, step: 0.1 }}
          defaultValue={room.length}
          onChange={(event) => {
            const nextValue = toNumberOrUndefined(event.target.value);
            if (typeof nextValue === 'number') {
              onUpdateRoom(room.id, { length: nextValue });
            }
          }}
        />

        <AppTextField
          label="Height (m)"
          name="height"
          type="number"
          inputProps={{ min: 0.1, step: 0.1 }}
          defaultValue={room.height}
          onChange={(event) => {
            const nextValue = toNumberOrUndefined(event.target.value);
            if (typeof nextValue === 'number') {
              onUpdateRoom(room.id, { height: nextValue });
            }
          }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <AppTextField
            label="Position X"
            name="positionX"
            type="number"
            inputProps={{ step: 0.1 }}
            defaultValue={room.position.x}
            onChange={(event) => {
              const nextValue = toNumberOrUndefined(event.target.value);
              if (typeof nextValue === 'number') {
                onUpdateRoom(room.id, { position: { ...room.position, x: nextValue } });
              }
            }}
          />
          <AppTextField
            label="Position Y"
            name="positionY"
            type="number"
            inputProps={{ step: 0.1 }}
            defaultValue={room.position.y}
            onChange={(event) => {
              const nextValue = toNumberOrUndefined(event.target.value);
              if (typeof nextValue === 'number') {
                onUpdateRoom(room.id, { position: { ...room.position, y: nextValue } });
              }
            }}
          />
          <AppTextField
            label="Position Z"
            name="positionZ"
            type="number"
            inputProps={{ step: 0.1 }}
            defaultValue={room.position.z}
            onChange={(event) => {
              const nextValue = toNumberOrUndefined(event.target.value);
              if (typeof nextValue === 'number') {
                onUpdateRoom(room.id, { position: { ...room.position, z: nextValue } });
              }
            }}
          />
        </Stack>
      </Stack>
    </SectionCard>
  );
}
