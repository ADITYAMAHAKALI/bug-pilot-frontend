import { FaTimes } from 'react-icons/fa';
import { useGlobalContext, useProjectContext } from '../context';
import styled from 'styled-components';
import { useEffect } from 'react';

const ProjectModal = () => {
  const { isModalOpen, closeModal } = useGlobalContext();
  const { handleProjectSubmit, project, setProject, modalStage } =
    useProjectContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProjectSubmit();
    closeModal();
  };
  // useEffect(()=>{
  //   console.log('project', project)
  // },[])

  return (
    <Wrapper>
      <div
        className={`${
          isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'
        }`}
      >
        <div className="modal-container">
          <h3>{modalStage} Project</h3>
          <form onSubmit={handleSubmit}>
          {/* {modalStage === 'edit' && console.log('project', project)}   */}
            <div className="form-row">
              <label htmlFor="projectName" className="form-label">
                Project Name:
              </label>
              <input
                type="text"
                required
                id="projectName"
                className="form-input"
                value={project.projectName}
                onChange={(e) => {
                  setProject({ ...project, projectName: e.target.value });
                }}
              />
            </div>

            <div className="form-row">
              <label htmlFor="projectDescription" className="form-label">
                Project Description:
              </label>
              <textarea
                id="projectDescription"
                required
                className="form-textarea"
                value={project.projectDescription}
                onChange={(e) => {
                  setProject({
                    ...project,
                    projectDescription: e.target.value,
                  });
                }}
              />
            </div>

            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </form>

          <button className="close-modal-btn" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    transition: var(--transition);
    visibility: hidden;
    z-index: -1;
  }
  /* OPEN/CLOSE MODAL */
  .show-modal {
    visibility: visible;
    z-index: 10;
  }
  .modal-container {
    background: var(--white);
    border-radius: var(--borderRadius);
    width: 90vw;
    padding: 2rem;
    position: relative;
    max-width: 40rem;
    text-align: center;
  }

  form {
    padding: 2rem 1.5rem;
    margin: 0 auto;
    text-align: left;
  }

  .close-modal-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--red-dark);
    cursor: pointer;
  }
`;

export default ProjectModal;
