import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppButton, ConfirmDialog, EmptyState, PageHeader, SectionCard } from '@/components';
import { ProjectCreateDialog } from '@/features/projects/components';
import { toProjectSummary } from '@/features/projects/domain';
import { useProjectWorkspaceStore } from '@/features/projects/store';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const projects = useProjectWorkspaceStore((state) => state.projects);
  const status = useProjectWorkspaceStore((state) => state.status);
  const error = useProjectWorkspaceStore((state) => state.error);
  const loadProjects = useProjectWorkspaceStore((state) => state.loadProjects);
  const createProject = useProjectWorkspaceStore((state) => state.createProject);
  const deleteProject = useProjectWorkspaceStore((state) => state.deleteProject);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  const deleteTarget = deleteTargetId ? projects.find((project) => project.id === deleteTargetId) ?? null : null;

  const handleCreateProject = async (values: {
    name: string;
    description: string;
    plotWidth?: number;
    plotLength?: number;
  }) => {
    const project = await createProject(values);
    setCreateOpen(false);
    navigate(`/projects/${project.id}`);
  };

  const handleDeleteProject = async () => {
    if (!deleteTargetId) {
      return;
    }

    await deleteProject(deleteTargetId);
    setDeleteTargetId(null);
  };

  const summaries = [...projects].map(toProjectSummary);

  return (
    <Stack spacing={3}>
      <PageHeader
        eyebrow="Delivery"
        title="Projects"
        description="Create and manage local project workspaces. Each project stores buildings, floors, and rooms in the browser until we replace the repository implementation later."
        actions={
          <AppButton startIcon={<AddRoundedIcon />} variant="contained" onClick={() => setCreateOpen(true)}>
            Create project
          </AppButton>
        }
      />

      {status === 'loading' && projects.length === 0 ? (
        <SectionCard title="Loading projects" description="Fetching saved project workspaces from local storage.">
          <Typography variant="body2" color="text.secondary">
            Please wait while the project repository is loaded.
          </Typography>
        </SectionCard>
      ) : null}

      {error && projects.length === 0 ? (
        <SectionCard title="Project storage warning">
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </SectionCard>
      ) : null}

      {summaries.length === 0 && status !== 'loading' ? (
        <EmptyState
          icon={<FolderOpenRoundedIcon fontSize="large" />}
          title="No projects yet"
          description="Create a project to start a local building workspace."
          action={
            <AppButton startIcon={<AddRoundedIcon />} variant="contained" onClick={() => setCreateOpen(true)}>
              Create project
            </AppButton>
          }
        />
      ) : (
        <SectionCard title="Local projects" description="Projects are stored locally and can be reopened after refresh.">
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Last updated</TableCell>
                  <TableCell align="right">Buildings</TableCell>
                  <TableCell align="right">Floors</TableCell>
                  <TableCell align="right">Rooms</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {summaries.map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        {project.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{new Date(project.updatedAt).toLocaleString()}</TableCell>
                    <TableCell align="right">{project.buildingCount}</TableCell>
                    <TableCell align="right">{project.floorCount}</TableCell>
                    <TableCell align="right">{project.roomCount}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <AppButton
                          size="small"
                          startIcon={<FolderOpenRoundedIcon fontSize="small" />}
                          component={RouterLink}
                          to={`/projects/${project.id}`}
                        >
                          Open
                        </AppButton>
                        <AppButton
                          size="small"
                          startIcon={<DeleteRoundedIcon fontSize="small" />}
                          color="error"
                          variant="outlined"
                          onClick={() => setDeleteTargetId(project.id)}
                        >
                          Delete
                        </AppButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SectionCard>
      )}

      <ProjectCreateDialog open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={handleCreateProject} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete project?"
        description="This will remove the local project from the repository."
        confirmLabel="Delete"
        onConfirm={handleDeleteProject}
        onClose={() => setDeleteTargetId(null)}
      >
        {deleteTarget ? (
          <Typography variant="body2" color="text.secondary">
            {deleteTarget.name} will be removed from the local project list.
          </Typography>
        ) : null}
      </ConfirmDialog>
    </Stack>
  );
}
