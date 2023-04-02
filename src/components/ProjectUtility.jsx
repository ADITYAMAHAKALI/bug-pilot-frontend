import styled from 'styled-components';
import { MdCreateNewFolder } from 'react-icons/md';

const ProjectUtility = ({ handleOpenModal }) => {
  return (
    <Wrapper>
      <h4>Create a new project</h4>
      <button
        type="button"
        className="btn"
        onClick={() => handleOpenModal(null)}
      >
        Add Project <MdCreateNewFolder />
      </button>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
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
`;

export default ProjectUtility;
