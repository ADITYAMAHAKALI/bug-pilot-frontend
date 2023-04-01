import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdCreateNewFolder } from 'react-icons/md';
import { useGlobalContext, useProjectContext } from '../context';
import { ProjectModal } from '../components';
import { useEffect } from 'react';

const Dashboard = () => {
  const { openModal, user } = useGlobalContext();
  const { setModalStage, projects, getProjects, getProject, deleteProject } =
    useProjectContext();

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

  useEffect(() => {
    getProjects();
  }, [projects, user, getProjects]);

  return (
    <Wrapper>
      <ProjectModal />
      <header className="section">
        <div className="title">
          <p>
            Hello, <span>{user?.username}!</span>
          </p>
          <h1>Your Projects</h1>
          <div className="title-underline"></div>
        </div>
      </header>

      <section className="section">
        <div className="section-center">
          <div className="add-project">
            <h4>Create a new project</h4>
            <button
              type="button"
              className="btn"
              onClick={() => handleOpenModal(null)}
            >
              Add Project <MdCreateNewFolder />
            </button>
          </div>

          {/* <hr /> */}

          {projects.length === 0 && (
            <p className="projects-msg">
              No projects till now. Please add a project.
            </p>
          )}

          <div className="project-center">
            {projects &&
              projects?.map((project) => {
                const { projectId, projectName, projectDescription } = project;

                return (
                  <article key={projectId} className="project">
                    <span>ID: {projectId}</span>
                    <h2>{projectName}</h2>
                    <p>{projectDescription}</p>
                    <Link
                      to={`/dashboard/${projectId}`}
                      className="btn btn-outline"
                    >
                      View Project
                    </Link>

                    <div className="project-footer">
                      <button
                        type="button"
                        id="edit"
                        onClick={() => handleOpenModal(projectId)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        id="delete"
                        onClick={() => deleteProject(projectId)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  header {
    background: var(--primary-1);
    text-align: center;

    p{
      margin: 0 auto .5rem;
      span{
        font-weight: 700;
      }
    }

    .title {
      margin-bottom: 0;
    }
  }

  .add-project {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
    margin: 0 auto;

    h4 {
      margin-bottom: 0;
    }

    .btn {
      padding: 0.5rem 1rem;
      font-size: 1rem;

      svg {
        vertical-align: middle;
        font-size: 1.3rem;
      }
    }
  }

  hr {
    margin: 2rem auto 4rem;
    width: 100%;
    border: 1px solid var(--grey-3);
    max-width: 800px;
  }

  .project-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    margin-top: 4rem;

    @media screen and (min-width: 892px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 1200px) {
      gap: 4rem
    }

    @media screen and (min-width: 1460px) {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5rem 6rem;
    }
  }

  .project {
    background: var(--white);
    padding: 1.5rem 3rem;
    border-radius: var(--borderRadius);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-left: 4px solid var(--primary-5);
    position: relative;

    span {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--grey-2);
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    &:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    p {
      margin-bottom: 0;
    }

    .btn {
      margin-top: 1rem;
      border-radius: 0;
      padding: .25rem .5rem;
      text-decoration: underline:
    }
  }

  .project-footer {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-top: 1.5rem;

    button {
      background: transparent;
      border-color: transparent;
      color: var(--white);
      cursor: pointer;
      transition: var(--transition);
      font-size: 1rem;
      padding: 0.25rem 0.5rem;
      letter-spacing: var(--spacing);

      &:hover {
        background: var(--primary-5);
        color: var(--white);
      }

      &#edit {
        background: #00b3ff;
      }

      &#delete {
        background: #ff2c2c;
      }
    }
  }

  .projects-msg {
    text-align: center;
    margin: 4rem auto;
  }
`;

export default Dashboard;
