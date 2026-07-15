import { describe, expect, it } from 'vitest';
import { createRoomDraft } from '@/features/projects/domain';
import { toRoomScenePosition, toRoomSceneRotation, toRoomSceneSize } from './project-scene-mapper';

describe('project scene mapper', () => {
  it('maps room dimensions and transform into scene primitives', () => {
    const room = createRoomDraft({
      width: 8,
      length: 10,
      height: 3.5,
      position: { x: 2, y: 1.75, z: -4 },
      rotation: { x: 0, y: 1.57, z: 0 },
    });

    expect(toRoomSceneSize(room)).toEqual([8, 3.5, 10]);
    expect(toRoomScenePosition(room)).toEqual([2, 1.75, -4]);
    expect(toRoomSceneRotation(room)).toEqual([0, 1.57, 0]);
  });
});
