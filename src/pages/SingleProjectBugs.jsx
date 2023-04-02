import { useEffect, useState } from 'react';
import { BugCard, BugUtility, BugsModal, PageTitle } from '../components';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  useBugsContext,
  useGlobalContext,
  useProjectContext,
} from '../context';

const SingleProjectBugs = () => {
  const params = useParams();
  const { id: projectId } = params;

  // context
  const { openModal } = useGlobalContext();
  const { getProject, project } = useProjectContext();
  const { setModalStage, bugs, getBugs, bug, getBug, deleteBug } =
    useBugsContext();

  // states
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [sortQuery, setSortQuery] = useState('latest');

  // # Functions
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

  // # useEffects
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

      <PageTitle
        title={project?.projectName}
        description={project?.projectDescription}
      />

      <section className="section">
        <div className="section-center">
          <h3 className="bugs-title">List of all the Bugs</h3>

          <BugUtility
            searchQuery={searchQuery}
            handleSearchInput={handleSearchInput}
            sortQuery={sortQuery}
            handleSortInput={handleSortInput}
            handleOpenModal={handleOpenModal}
          />

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
              filteredBugs?.map((bug) => (
                <BugCard
                  key={bug?.bugId}
                  projectId={projectId}
                  bug={bug}
                  handleOpenModal={handleOpenModal}
                  deleteBug={deleteBug}
                />
              ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  .bugs-title {
    text-align: center;
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

  .bugs-msg {
    text-align: center;
    margin: 2rem auto;
  }
`;

export default SingleProjectBugs;
