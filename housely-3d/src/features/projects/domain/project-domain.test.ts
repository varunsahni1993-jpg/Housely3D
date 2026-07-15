import { describe, expect, it, vi } from 'vitest';
import {
  countProjectBuildings,
  countProjectFloors,
  countProjectRooms,
  createBuildingDraft,
  createFloorDraft,
  createProjectDraft,
  createRoomDraft,
  projectSchema,
  toProjectSummary,
  updateRoomRecord,
} from './project-domain';

describe('project domain', () => {
  it('creates a project hierarchy with stable timestamps and defaults', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-15T10:00:00.000Z'));

    const project = createProjectDraft({
      name: 'Sample project',
      description: 'A short but valid description.',
      plotWidth: 12,
      plotLength: 20,
    });
    const building = createBuildingDraft({}, 0);
    const floor = createFloorDraft({}, 0);
    const room = createRoomDraft({}, 0);

    expect(project.name).toBe('Sample project');
    expect(project.description).toBe('A short but valid description.');
    expect(project.createdAt).toBe('2026-07-15T10:00:00.000Z');
    expect(project.updatedAt).toBe(project.createdAt);
    expect(projectSchema.safeParse(project).success).toBe(true);

    expect(building.name).toBe('Building 1');
    expect(floor.name).toBe('Floor 1');
    expect(room.name).toBe('Room 1');
    expect(room.width).toBe(4);
    expect(room.length).toBe(5);
    expect(room.height).toBe(3);
    expect(room.position).toEqual({ x: 0, y: 1.5, z: 0 });

    expect(countProjectBuildings(project)).toBe(0);
    expect(countProjectFloors(project)).toBe(0);
    expect(countProjectRooms(project)).toBe(0);
    expect(toProjectSummary(project)).toMatchObject({
      name: 'Sample project',
      buildingCount: 0,
      floorCount: 0,
      roomCount: 0,
    });

    vi.useRealTimers();
  });

  it('updates room dimensions immutably', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-15T10:00:00.000Z'));

    const project = createProjectDraft({
      name: 'Sample project',
      description: 'A valid description for the model.',
    });
    const building = createBuildingDraft({}, 0);
    const floor = createFloorDraft({}, 0);
    const room = createRoomDraft({ width: 3, length: 4, height: 2.5 }, 0);

    const nextProject = {
      ...project,
      buildings: [
        {
          ...building,
          floors: [
            {
              ...floor,
              rooms: [room],
            },
          ],
        },
      ],
    };

    const updatedProject = updateRoomRecord(nextProject, room.id, {
      width: 6,
      position: { x: 2, y: 1.5, z: 4 },
    });

    expect(updatedProject).not.toBe(nextProject);
    expect(updatedProject.buildings[0].floors[0].rooms[0]).toMatchObject({
      width: 6,
      length: 4,
      height: 2.5,
      position: { x: 2, y: 1.5, z: 4 },
    });

    vi.useRealTimers();
  });
});
