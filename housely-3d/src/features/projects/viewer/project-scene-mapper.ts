import type { ProjectPoint3D, Room } from '@/features/projects/domain';

export const BUILDING_SCENE_SPACING = 22;
export const FLOOR_SCENE_SPACING = 4.5;

export function toRoomSceneSize(room: Room): readonly [number, number, number] {
  return [room.width, room.height, room.length];
}

export function toRoomScenePosition(room: Room): readonly [number, number, number] {
  const position: ProjectPoint3D = room.position;
  return [position.x, position.y, position.z];
}

export function toRoomSceneRotation(room: Room): readonly [number, number, number] {
  const rotation: ProjectPoint3D = room.rotation;
  return [rotation.x, rotation.y, rotation.z];
}
