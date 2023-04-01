import { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useBugsContext } from '../context';
import { formatDate } from '../utils/helper';
import { FaUser } from 'react-icons/fa';
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';

const SingleBugPage = () => {
  const params = useParams();
  const { id, bugId } = params;

  // context
  const { getBug, bug } = useBugsContext();

  // # useEffect
  useEffect(() => {
    getBug(id, bugId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bugId, id]);

  return (
    <Wrapper>
      <header className="section">
        <div className="title">
          <h1>{bug?.bugTitle}</h1>
          <div className="title-underline"></div>
        </div>
      </header>

      <section className="section">
        <div className="section-center">
          <h3 className="bugs-title">Bug Details</h3>
          <div className="bug-details">
            <article className="id">
              <span>ID: {bug?.bugId}</span>
            </article>

            <article className="description">
              <h4>Description</h4>
              <p>{bug?.bugDescription}</p>
            </article>

            <article className="status">
              <h4>Status:</h4>
              <p className={bug?.bugStatus}>
                {bug?.bugStatus === 'open' ? (
                  <>
                    <IoCheckmarkCircleOutline /> Open
                  </>
                ) : (
                  <>
                    <IoCloseCircleOutline /> Closed
                  </>
                )}
              </p>
            </article>

            <article className="author">
              <h4>Author:</h4>
              <p>
                <FaUser /> {bug?.bugAuthor}
              </p>
            </article>

            <article className="label">
              <h4>Label:</h4>
              <p>{bug?.bugLabel}</p>
            </article>

            <article className="author">
              <h4>Created On:</h4>
              <p>{formatDate(bug.bugCreatedOn)}</p>
            </article>
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
  }

  section.section{
    padding-top:0;
  }

  .bugs-title {
    text-align: center;
    margin: 3rem 0 2rem;
  }

  .bug-details {
    background: var(--white);
    padding: 2rem;
    margin: 0 auto;
    max-width: 800px;
    border-radius: var(--borderRadius);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    position: relative;

    h4 {
      margin-bottom: 0.5rem;
      display: inline-block;
      border-bottom: 1px solid #ccc;
      font-size: 1.25rem;
    }

    .id{
      position: absolute;
      top: 0;
      right: 0;
      background: var(--primary-5);
      color: var(--white);
      padding: 0.25rem 0.5rem .35rem 1.2rem;
      border-radius: 0 0 0 2rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;

    }

    .description{
      p {
        margin-bottom: 0;
      }
    }

    .status,
    .author,
    .label {
      display: flex;
      gap: 1.25rem;
      align-items: center;
      margin: 2rem 0;

      h4,
      p {
        margin-bottom: 0;
      }
    }

    .status {
      p {
        text-transform: capitalize;
        border-radius: 2rem;
        background: var(--red-dark);
        color: var(--white);
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        display: inline-block;

        svg {
          font-size: 1rem;
          vertical-align: text-bottom;
        }
      }

      p.open {
        background: var(--green-dark);
      }
    }

    .author {
      svg {
        vertical-align: middle;
        margin-right: 0.25rem;
        color: var(--primary-5);
      }
    }

    .label {
      p {
        text-transform: lowercase;
        background: var(--black);
        color: var(--white);
        padding: 0.1rem 1rem;
        font-size: 0.75rem;
        border-radius: 2rem;
      }
  }
`;

export default SingleBugPage;
