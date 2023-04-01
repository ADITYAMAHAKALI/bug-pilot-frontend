import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  useBugsContext,
  useGlobalContext,
  useProjectContext,
} from '../context';
import { useEffect, useState } from 'react';
import { BugsModal } from '../components';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';

const SingleProject = () => {
  const params = useParams();
  const { id: projectId } = params;
  const { openModal } = useGlobalContext();
  const { getProject, project } = useProjectContext();
  const { setModalStage, bugs, getBugs, bug, getBug, deleteBug } =
    useBugsContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [sortQuery, setSortQuery] = useState('latest');

  // handle search input
  function handleSearchInput(e) {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);

    if (searchTerm !== '') {
      const newBugs = bugs.filter((bug) =>
        bug.bugTitle.toLowerCase().includes(searchTerm)
      );
      setFilteredBugs(newBugs);
    } else {
      setFilteredBugs(bugs);
    }
  }

  // handle sort input
  function handleSortInput(e) {
    const sortTerm = e.target.value;
    setSortQuery(sortTerm);

    if (sortTerm === 'latest') {
      const newBugs = bugs.sort((a, b) => {
        return new Date(b.bugCreatedOn) - new Date(a.bugCreatedOn);
      });
      setFilteredBugs(newBugs);
    } else if (sortTerm === 'asc') {
      const newBugs = bugs.sort((a, b) => {
        return a.bugTitle.localeCompare(b.bugTitle);
      });
      setFilteredBugs(newBugs);
    } else if (sortTerm === 'desc') {
      const newBugs = bugs.sort((a, b) => {
        return b.bugTitle.localeCompare(a.bugTitle);
      });
      setFilteredBugs(newBugs);
    }
  }

  // handle open modal
  const handleOpenModal = (id) => {
    if (id) {
      setModalStage('edit');
      getBug(projectId, id);
    } else {
      setModalStage('add');
    }
    openModal();
  };

  useEffect(() => {
    getBugs(projectId);
    setFilteredBugs(bugs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bug]);

  useEffect(() => {
    setFilteredBugs(bugs);
    handleSortInput({ target: { value: 'latest' } });
    getProject(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bugs]);

  return (
    <Wrapper>
      <BugsModal project={project} />
      <header className="section">
        <div className="title">
          <h1>{project?.projectName} </h1>
          <div className="title-underline"></div>
          <p>{project?.projectDescription}</p>
        </div>
      </header>

      <section className="section">
        <div className="section-center">
          <h3 className="bugs-title">List of all the Bugs</h3>

          <div className="bugs-utilities">
            <input
              type="text"
              className="form-input"
              placeholder="Search Bug"
              value={searchQuery}
              onChange={handleSearchInput}
            />
            <div>
              <span className="sort-title">Sort By</span>
              <select
                value={sortQuery}
                onChange={handleSortInput}
                className="sort-btn"
              >
                Sort By
                <option value="latest">latest</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
            <button
              type="button"
              className="btn"
              onClick={() => handleOpenModal(null)}
            >
              Add Bug <FaPlus />
            </button>
          </div>

          <hr />

          {bugs.length === 0 && (
            <p className="bugs-msg">No bugs added till now..</p>
          )}
          {bugs.length !== 0 && filteredBugs.length === 0 && (
            <p className="bugs-msg">
              No bugs found with title - "{searchQuery}"
            </p>
          )}

          <div className="bugs-center">
            {bugs !== undefined &&
              filteredBugs?.map((bug) => {
                const { bugId, bugTitle, bugAuthor, open } = bug;

                return (
                  <article key={bugId} className="bug">
                    <Link
                      to={`/dashboard/${projectId}/bugs/${bugId}`}
                      className="bug-link"
                    >
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
                      <button
                        type="button"
                        id="edit"
                        onClick={() => handleOpenModal(bugId)}
                      >
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

    .title {
      margin-bottom: 0;
    }

    p {
      margin: 1rem auto 0;
    }
  }

  .bugs-title {
    text-align: center;
  }

  .bugs-utilities {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem auto;
    max-width: 800px;

    .form-input {
      display: block;
      width: auto;
      padding: 0.75rem 1rem;
      background: var(--white);
      border: 1px solid var(--grey-3);
    }

    .btn {
      padding: 0.75rem 1rem;
    }
  }

  hr {
    margin: 2rem auto;
    width: 100%;
    border: 1px solid var(--grey-3);
    max-width: 800px;
  }

  .bugs-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .bug {
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

  .bugs-msg {
    text-align: center;
    margin: 2rem auto;
  }

  .sort-title {
    @media (min-width: 425px) {
      border-left: 1px solid var(--grey-5);
      padding-left: 1rem;
    }
  }

  .sort-btn {
    padding: 0.75rem 1rem;
    background: var(--white);
    border: 1px solid var(--grey-3);
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    margin-left: 0.5rem;
  }
`;

export default SingleProject;
