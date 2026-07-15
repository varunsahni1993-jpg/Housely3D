import { z } from 'zod';

export type StableId = string;
export type IsoTimestamp = string;

export interface ProjectPoint3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface Room {
  readonly id: StableId;
  readonly name: string;
  readonly type: string;
  readonly width: number;
  readonly length: number;
  readonly height: number;
  readonly position: ProjectPoint3D;
  readonly rotation: ProjectPoint3D;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface Floor {
  readonly id: StableId;
  readonly name: string;
  readonly rooms: Room[];
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface Building {
  readonly id: StableId;
  readonly name: string;
  readonly floors: Floor[];
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface Project {
  readonly id: StableId;
  readonly name: string;
  readonly description: string;
  readonly plotWidth?: number;
  readonly plotLength?: number;
  readonly buildings: Building[];
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface ProjectSelection {
  readonly buildingId: StableId | null;
  readonly floorId: StableId | null;
  readonly roomId: StableId | null;
}

export interface ProjectSummary {
  readonly id: StableId;
  readonly name: string;
  readonly description: string;
  readonly updatedAt: IsoTimestamp;
  readonly buildingCount: number;
  readonly floorCount: number;
  readonly roomCount: number;
}

export interface CreateProjectInput {
  readonly name: string;
  readonly description: string;
  readonly plotWidth?: number;
  readonly plotLength?: number;
}

export interface UpdateProjectInput {
  readonly name?: string;
  readonly description?: string;
  readonly plotWidth?: number;
  readonly plotLength?: number;
}

export interface CreateBuildingInput {
  readonly name?: string;
}

export interface UpdateBuildingInput {
  readonly name?: string;
}

export interface CreateFloorInput {
  readonly name?: string;
}

export interface UpdateFloorInput {
  readonly name?: string;
}

export interface CreateRoomInput {
  readonly name?: string;
  readonly type?: string;
  readonly width?: number;
  readonly length?: number;
  readonly height?: number;
  readonly position?: ProjectPoint3D;
  readonly rotation?: ProjectPoint3D;
}

export interface UpdateRoomInput {
  readonly name?: string;
  readonly type?: string;
  readonly width?: number;
  readonly length?: number;
  readonly height?: number;
  readonly position?: ProjectPoint3D;
  readonly rotation?: ProjectPoint3D;
}

const projectPoint3DSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

const roomSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1),
  width: z.number().positive(),
  length: z.number().positive(),
  height: z.number().positive(),
  position: projectPoint3DSchema,
  rotation: projectPoint3DSchema,
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

const floorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  rooms: z.array(roomSchema),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

const buildingSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  floors: z.array(floorSchema),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  plotWidth: z.number().positive().optional(),
  plotLength: z.number().positive().optional(),
  buildings: z.array(buildingSchema),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type ProjectSchemaShape = z.infer<typeof projectSchema>;

const defaultProjectPoint: ProjectPoint3D = {
  x: 0,
  y: 1.5,
  z: 0,
};

const defaultRotation: ProjectPoint3D = {
  x: 0,
  y: 0,
  z: 0,
};

function createTimestamp(): IsoTimestamp {
  return new Date().toISOString();
}

export function createStableId(): StableId {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `project-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function clonePoint(point: ProjectPoint3D): ProjectPoint3D {
  return {
    x: point.x,
    y: point.y,
    z: point.z,
  };
}

function mergePoint(point: ProjectPoint3D | undefined, fallback: ProjectPoint3D): ProjectPoint3D {
  if (!point) {
    return clonePoint(fallback);
  }

  return clonePoint(point);
}

function touch<T extends { updatedAt: IsoTimestamp }>(value: T, updatedAt: IsoTimestamp): T {
  return {
    ...value,
    updatedAt,
  };
}

export function createRoomDraft(input: CreateRoomInput = {}, index = 0): Room {
  const createdAt = createTimestamp();
  const offset = index * 6;

  return {
    id: createStableId(),
    name: input.name?.trim() || `Room ${index + 1}`,
    type: input.type?.trim() || 'Room',
    width: input.width ?? 4,
    length: input.length ?? 5,
    height: input.height ?? 3,
    position: mergePoint(input.position, {
      x: offset,
      y: 1.5,
      z: 0,
    }),
    rotation: mergePoint(input.rotation, defaultRotation),
    createdAt,
    updatedAt: createdAt,
  };
}

export function createFloorDraft(input: CreateFloorInput = {}, index = 0): Floor {
  const createdAt = createTimestamp();

  return {
    id: createStableId(),
    name: input.name?.trim() || `Floor ${index + 1}`,
    rooms: [],
    createdAt,
    updatedAt: createdAt,
  };
}

export function createBuildingDraft(input: CreateBuildingInput = {}, index = 0): Building {
  const createdAt = createTimestamp();

  return {
    id: createStableId(),
    name: input.name?.trim() || `Building ${index + 1}`,
    floors: [],
    createdAt,
    updatedAt: createdAt,
  };
}

export function createProjectDraft(input: CreateProjectInput): Project {
  const createdAt = createTimestamp();

  return {
    id: createStableId(),
    name: input.name.trim(),
    description: input.description.trim(),
    plotWidth: input.plotWidth,
    plotLength: input.plotLength,
    buildings: [],
    createdAt,
    updatedAt: createdAt,
  };
}

export function countProjectBuildings(project: Project): number {
  return project.buildings.length;
}

export function countProjectFloors(project: Project): number {
  return project.buildings.reduce((total, building) => total + building.floors.length, 0);
}

export function countProjectRooms(project: Project): number {
  return project.buildings.reduce(
    (buildingTotal, building) =>
      buildingTotal + building.floors.reduce((floorTotal, floor) => floorTotal + floor.rooms.length, 0),
    0,
  );
}

export function toProjectSummary(project: Project): ProjectSummary {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    updatedAt: project.updatedAt,
    buildingCount: countProjectBuildings(project),
    floorCount: countProjectFloors(project),
    roomCount: countProjectRooms(project),
  };
}

export function toProjectSummaries(projects: readonly Project[]): ProjectSummary[] {
  return [...projects]
    .map(toProjectSummary)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function updateProjectRecord(project: Project, patch: UpdateProjectInput): Project {
  const updatedAt = createTimestamp();

  return touch(
    {
      ...project,
      name: patch.name?.trim() || project.name,
      description: patch.description?.trim() || project.description,
      plotWidth: patch.plotWidth ?? project.plotWidth,
      plotLength: patch.plotLength ?? project.plotLength,
    },
    updatedAt,
  );
}

export function addBuildingToProject(project: Project, building: Building): Project {
  return touch(
    {
      ...project,
      buildings: [...project.buildings, building],
    },
    createTimestamp(),
  );
}

export function updateBuildingRecord(project: Project, buildingId: StableId, patch: UpdateBuildingInput): Project {
  const updatedAt = createTimestamp();

  return touch(
    {
      ...project,
      buildings: project.buildings.map((building) =>
        building.id === buildingId
          ? touch(
              {
                ...building,
                name: patch.name?.trim() || building.name,
              },
              updatedAt,
            )
          : building,
      ),
    },
    updatedAt,
  );
}

export function removeBuildingFromProject(project: Project, buildingId: StableId): Project {
  const updatedAt = createTimestamp();

  return touch(
    {
      ...project,
      buildings: project.buildings.filter((building) => building.id !== buildingId),
    },
    updatedAt,
  );
}

export function addFloorToBuilding(project: Project, buildingId: StableId, floor: Floor): Project {
  const updatedAt = createTimestamp();

  return touch(
    {
      ...project,
      buildings: project.buildings.map((building) =>
        building.id === buildingId
          ? touch(
              {
                ...building,
                floors: [...building.floors, floor],
              },
              updatedAt,
            )
          : building,
      ),
    },
    updatedAt,
  );
}

export function updateFloorRecord(project: Project, floorId: StableId, patch: UpdateFloorInput): Project {
  const updatedAt = createTimestamp();

  return touch(
    {
      ...project,
      buildings: project.buildings.map((building) => ({
        ...building,
        floors: building.floors.map((floor) =>
          floor.id === floorId
            ? touch(
                {
                  ...floor,
                  name: patch.name?.trim() || floor.name,
                },
                updatedAt,
              )
            : floor,
        ),
      })),
    },
    updatedAt,
  );
}

export function removeFloorFromProject(project: Project, floorId: StableId): Project {
  const updatedAt = createTimestamp();

  return touch(
    {
      ...project,
      buildings: project.buildings.map((building) => ({
        ...building,
        floors: building.floors.filter((floor) => floor.id !== floorId),
      })),
    },
    updatedAt,
  );
}

export function addRoomToProject(project: Project, floorId: StableId, room: Room): Project {
  const updatedAt = createTimestamp();

  return touch(
    {
      ...project,
      buildings: project.buildings.map((building) => ({
        ...building,
        floors: building.floors.map((floor) =>
          floor.id === floorId
            ? touch(
                {
                  ...floor,
                  rooms: [...floor.rooms, room],
                },
                updatedAt,
              )
            : floor,
        ),
      })),
    },
    updatedAt,
  );
}

export function updateRoomRecord(project: Project, roomId: StableId, patch: UpdateRoomInput): Project {
  const updatedAt = createTimestamp();

  return touch(
    {
      ...project,
      buildings: project.buildings.map((building) => ({
        ...building,
        floors: building.floors.map((floor) => ({
          ...floor,
          rooms: floor.rooms.map((room) =>
            room.id === roomId
              ? touch(
                  {
                    ...room,
                    name: patch.name?.trim() || room.name,
                    type: patch.type?.trim() || room.type,
                    width: patch.width ?? room.width,
                    length: patch.length ?? room.length,
                    height: patch.height ?? room.height,
                    position: patch.position ? clonePoint(patch.position) : room.position,
                    rotation: patch.rotation ? clonePoint(patch.rotation) : room.rotation,
                  },
                  updatedAt,
                )
              : room,
          ),
        })),
      })),
    },
    updatedAt,
  );
}

export function removeRoomFromProject(project: Project, roomId: StableId): Project {
  const updatedAt = createTimestamp();

  return touch(
    {
      ...project,
      buildings: project.buildings.map((building) => ({
        ...building,
        floors: building.floors.map((floor) => ({
          ...floor,
          rooms: floor.rooms.filter((room) => room.id !== roomId),
        })),
      })),
    },
    updatedAt,
  );
}

export function findBuildingById(project: Project, buildingId: StableId): Building | null {
  return project.buildings.find((building) => building.id === buildingId) ?? null;
}

export function findFloorById(project: Project, floorId: StableId): Floor | null {
  for (const building of project.buildings) {
    const match = building.floors.find((floor) => floor.id === floorId);
    if (match) {
      return match;
    }
  }

  return null;
}

export function findRoomById(project: Project, roomId: StableId): Room | null {
  for (const building of project.buildings) {
    for (const floor of building.floors) {
      const match = floor.rooms.find((room) => room.id === roomId);
      if (match) {
        return match;
      }
    }
  }

  return null;
}

export function resolveRoomSelection(project: Project, roomId: StableId): ProjectSelection {
  for (const building of project.buildings) {
    for (const floor of building.floors) {
      const room = floor.rooms.find((entry) => entry.id === roomId);
      if (room) {
        return {
          buildingId: building.id,
          floorId: floor.id,
          roomId: room.id,
        };
      }
    }
  }

  return {
    buildingId: null,
    floorId: null,
    roomId: null,
  };
}

export function resolveFloorSelection(project: Project, floorId: StableId): ProjectSelection {
  for (const building of project.buildings) {
    const floor = building.floors.find((entry) => entry.id === floorId);
    if (floor) {
      return {
        buildingId: building.id,
        floorId: floor.id,
        roomId: null,
      };
    }
  }

  return {
    buildingId: null,
    floorId: null,
    roomId: null,
  };
}

export function resolveBuildingSelection(project: Project, buildingId: StableId): ProjectSelection {
  const building = findBuildingById(project, buildingId);

  if (!building) {
    return {
      buildingId: null,
      floorId: null,
      roomId: null,
    };
  }

  return {
    buildingId: building.id,
    floorId: null,
    roomId: null,
  };
}

export function normalizeProject(input: unknown): Project | null {
  const parsed = projectSchema.safeParse(input);

  return parsed.success ? parsed.data : null;
}

export function normalizeProjects(input: unknown): Project[] {
  const parsed = z.array(projectSchema).safeParse(input);

  return parsed.success ? parsed.data : [];
}

export const projectDomainDefaults = {
  point: defaultProjectPoint,
  rotation: defaultRotation,
};
