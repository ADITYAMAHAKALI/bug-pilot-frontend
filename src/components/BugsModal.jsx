import { FaTimes } from 'react-icons/fa';
import { useGlobalContext, useBugsContext } from '../context';
import styled from 'styled-components';
import { useProjectContext } from '../context';
import { useEffect } from 'react';
const BugsModal = ({project}) => {
  const { isModalOpen, closeModal } = useGlobalContext();
  const { handleBugSubmit, bug, setBug, modalStage } = useBugsContext();


  const handleSubmit = (e) => {
    e.preventDefault();
    handleBugSubmit(project);
    closeModal();
  };
  useEffect(() => {
    if(modalStage === 'edit'){
      setBug(project)
    }
  },[]);
  

  return (
    <Wrapper>
      <div
        className={`${
          isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'
        }`}
      >
        <div className="modal-container">
          <h3>{modalStage} Bug</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="bugTitle" className="form-label">
                Bug Title:
              </label>
              <input
                required
                type="text"
                id="bugTitle"
                className="form-input"
                value={bug.bugTitle}
                onChange={(e) => {
                  setBug({ ...bug, bugTitle: e.target.value });
                }}
              />
            </div>

            <div className="form-row">
              <label htmlFor="bugDescription" className="form-label">
                Bug Description:
              </label>
              <textarea
                required
                id="bugDescription"
                className="form-textarea"
                value={bug.bugDescription}
                onChange={(e) => {
                  setBug({
                    ...bug,
                    bugDescription: e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-row">
              <label htmlFor="bugAuthor" className="form-label">
                Bug Author:
              </label>
              <input
                required
                type="text"
                id="bugAuthor"
                className="form-input"
                value={project?.user?.username}
                readOnly
              />
            </div>

            <div className="form-row">
              <label htmlFor="bugLabel" className="form-label">
                Bug Label:
              </label>
              <input
                required
                type="text"
                id="bugLabel"
                className="form-input"
                value={bug.bugLabel}
                onChange={(e) => {
                  setBug({ ...bug, bugLabel: e.target.value });
                }}
              />
            </div>

            <div className="form-row">
              <label htmlFor="bugStatus" className="form-label">
                Bug Status:
              </label>
              <select
                required
                id="bugStatus"
                className="form-input"
                value={bug.bugStatus}
                onChange={(e) => {
                  // after doing this it is working
                  //console.log('e.target.value', e.target.value) 
                  setBug({ ...bug, bugStatus: e.target.value });
                }}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
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

export default BugsModal;
