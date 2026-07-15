/* eslint-disable react/no-unknown-property */
import type { Project } from '@/features/projects/domain';
import { toRoomScenePosition, toRoomSceneRotation, toRoomSceneSize, BUILDING_SCENE_SPACING, FLOOR_SCENE_SPACING } from './project-scene-mapper';

interface ProjectSceneProps {
  project: Project;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export function ProjectScene({ project, selectedRoomId, onSelectRoom }: ProjectSceneProps) {
  return (
    <group>
      {project.buildings.map((building, buildingIndex) => (
        <group key={building.id} position={[buildingIndex * BUILDING_SCENE_SPACING, 0, 0]}>
          {building.floors.map((floor, floorIndex) => (
            <group key={floor.id} position={[0, floorIndex * FLOOR_SCENE_SPACING, 0]}>
              {floor.rooms.map((room) => {
                const selected = room.id === selectedRoomId;

                return (
                  <mesh
                    key={room.id}
                    castShadow
                    receiveShadow
                    position={toRoomScenePosition(room)}
                    rotation={toRoomSceneRotation(room)}
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelectRoom(room.id);
                    }}
                  >
                    <boxGeometry args={toRoomSceneSize(room)} />
                    <meshStandardMaterial
                      color={selected ? '#f59e0b' : '#93c5fd'}
                      emissive={selected ? '#f59e0b' : '#0f172a'}
                      emissiveIntensity={selected ? 0.35 : 0.1}
                      roughness={0.45}
                      metalness={0.08}
                    />
                  </mesh>
                );
              })}
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}
