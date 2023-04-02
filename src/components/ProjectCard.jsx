import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProjectCard = ({ project, handleOpenModal, deleteProject }) => {
  const { projectId, projectName, projectDescription } = project;

  return (
    <ProjectWrapper>
      <span>ID: {projectId}</span>
      <h2>{projectName}</h2>
      <p>{projectDescription}</p>
      <Link to={`/projects/${projectId}`} className="btn btn-outline">
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
    </ProjectWrapper>
  );
};

export const ProjectWrapper = styled.article`
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
`;

export default ProjectCard;
