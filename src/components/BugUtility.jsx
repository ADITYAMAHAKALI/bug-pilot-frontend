import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const BugUtility = ({
  searchQuery,
  handleSearchInput,
  sortQuery,
  handleSortInput,
  handleOpenModal,
}) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export const Wrapper = styled.div`
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

export default BugUtility;
