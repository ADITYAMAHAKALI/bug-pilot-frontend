import { useEffect } from 'react';
import styled from 'styled-components';
import {
  PageTitle,
  ProjectCard,
  ProjectModal,
  ProjectUtility,
} from '../components';
import {
  useGlobalContext,
  useAuthContext,
  useProjectContext,
} from '../context';

const Dashboard = () => {
  // context
  const { openModal } = useGlobalContext();
  const { user } = useAuthContext();
  const { setModalStage, projects, getProjects, getProject, deleteProject } =
    useProjectContext();

  // # Functions
  // handle open modal
  const handleOpenModal = (id) => {
    if (id) {
      setModalStage('edit');
      getProject(id);
    } else {
      setModalStage('add');
    }
    openModal();
  };

  // # useEffect
  useEffect(() => {
    getProjects();
  }, [projects, user, getProjects]);

  return (
    <Wrapper>
      <ProjectModal />

      <PageTitle
        title="Your Projects"
        subTitle={
          <p className="subtitle">
            Hello, <span>{user?.username}!</span>
          </p>
        }
      />

      <section className="section">
        <div className="section-center">
          <ProjectUtility handleOpenModal={handleOpenModal} />

          {projects.length === 0 && (
            <p className="projects-msg">
              No projects till now. Please add a project.
            </p>
          )}

          <div className="project-center">
            {projects &&
              projects?.map((project) => (
                <ProjectCard
                  key={project?.projectId}
                  project={project}
                  handleOpenModal={handleOpenModal}
                  deleteProject={deleteProject}
                />
              ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  .project-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    margin-top: 4rem;

    @media screen and (min-width: 892px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 1200px) {
      gap: 4rem;
    }

    @media screen and (min-width: 1460px) {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5rem 6rem;
    }
  }

  .projects-msg {
    text-align: center;
    margin: 4rem auto;
  }
`;

export default Dashboard;
