import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';

const BugCard = ({ projectId, bug, handleOpenModal, deleteBug }) => {
  const { bugId, bugTitle, bugAuthor, open } = bug;

  return (
    <BugWrapper>
      <Link to={`/projects/${projectId}/bugs/${bugId}`} className="bug-link">
        <h4>{bugTitle}</h4>
        <span className={`bug-status ${open && 'open'}`}>
          {open === true ? (
            <>
              <IoCheckmarkCircleOutline /> Open
            </>
          ) : (
            <>
              <IoCloseCircleOutline /> Closed
            </>
          )}
        </span>
        <small>
          BugID: <strong>{bugId}</strong> by{' '}
          <strong>
            <u>{bugAuthor}</u>
          </strong>
        </small>
      </Link>

      <div className="bug-footer">
        <button type="button" id="edit" onClick={() => handleOpenModal(bugId)}>
          <FaEdit />
        </button>
        <button
          type="button"
          id="delete"
          onClick={() => deleteBug(bugId, projectId)}
        >
          <FaTrash />
        </button>
      </div>
    </BugWrapper>
  );
};

export const BugWrapper = styled.article`
  width: 100%;
  background: var(--white);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: var(--fixedWidth);
  border-radius: var(--borderRadius);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  transition: var(--transition);

  &:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  }

  .bug-link h4 {
    margin-bottom: 0;
    text-decoration: underline;
  }

  .bug-status {
    text-transform: capitalize;
    border-radius: 2rem;
    background: var(--red-dark);
    color: var(--white);
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    display: inline-block;
    margin-bottom: 0.75rem;
    margin-top: 1rem;

    svg {
      font-size: 1rem;
      vertical-align: text-bottom;
    }
  }

  .bug-status.open {
    background: var(--green-dark);
  }

  .bug-link small {
    display: block;
    text-transform: unset;
  }

  .bug-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;

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

export default BugCard;
