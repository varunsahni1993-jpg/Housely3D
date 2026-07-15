import { describe, expect, it } from 'vitest';
import { createProjectDraft } from '@/features/projects/domain';
import { createProjectRepository } from './project-repository';

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

describe('project repository', () => {
  it('persists, loads, and deletes project records locally', async () => {
    const storage = createMemoryStorage();
    const repository = createProjectRepository(storage, 'projects');
    const project = createProjectDraft({
      name: 'Local project',
      description: 'A project stored through the repository abstraction.',
    });

    await repository.saveProject(project);

    const loaded = await repository.getProject(project.id);
    const allProjects = await repository.listProjects();

    expect(loaded?.id).toBe(project.id);
    expect(allProjects).toHaveLength(1);

    await repository.deleteProject(project.id);

    expect(await repository.getProject(project.id)).toBeNull();
    expect(await repository.listProjects()).toHaveLength(0);
  });

  it('ignores invalid stored payloads', async () => {
    const storage = createMemoryStorage('{"version":1,"projects":[{"bad":true}]}');
    const repository = createProjectRepository(storage, 'projects');

    await expect(repository.listProjects()).resolves.toEqual([]);
  });
});
