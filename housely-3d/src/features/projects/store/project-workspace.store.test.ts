import { describe, expect, it } from 'vitest';
import { createProjectRepository } from '@/features/projects/repository';
import { createProjectWorkspaceStore } from './project-workspace.store';

function createMemoryStorage(initialValue?: string) {
  let value = initialValue ?? null;

  return {
    getItem: () => value,
    setItem: (_key: string, nextValue: string) => {
      value = nextValue;
    },
    removeItem: () => {
      value = null;
    },
  };
}

describe('project workspace store', () => {
  it('creates projects, builds a hierarchy, updates a room, and keeps selection by stable ids', async () => {
    const repository = createProjectRepository(createMemoryStorage(), 'projects');
    const store = createProjectWorkspaceStore(repository);

    const project = await store.getState().createProject({
      name: 'Workspace project',
      description: 'Created through the workspace store.',
      plotWidth: 25,
      plotLength: 18,
    });

    expect(store.getState().activeProjectId).toBe(project.id);

    const building = await store.getState().createBuilding();
    const floor = await store.getState().createFloor();
    await store.getState().createRoom({
      name: 'Living area',
      type: 'Living Room',
      width: 5,
      length: 6,
      height: 3.2,
    });

    expect(building?.name).toBe('Building 1');
    expect(floor?.name).toBe('Floor 1');
    expect(store.getState().activeProject?.buildings).toHaveLength(1);
    expect(store.getState().activeProject?.buildings[0].floors).toHaveLength(1);
    expect(store.getState().selection.roomId).not.toBeNull();

    const selectedRoomId = store.getState().selection.roomId;
    expect(selectedRoomId).not.toBeNull();

    if (!selectedRoomId) {
      throw new Error('Expected a selected room id.');
    }

    await store.getState().updateRoom(selectedRoomId, {
      width: 7.5,
      position: { x: 2, y: 1.5, z: 3 },
    });

    const updatedRoom = store.getState().getSelectedRoom();

    expect(updatedRoom?.width).toBe(7.5);
    expect(updatedRoom?.position).toEqual({ x: 2, y: 1.5, z: 3 });

    await store.getState().loadProject(project.id);
    expect(store.getState().activeProject?.id).toBe(project.id);
    expect(store.getState().selection.roomId).toBeNull();
  });
});
