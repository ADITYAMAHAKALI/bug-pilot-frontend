import styled from 'styled-components';

const PageTitle = ({ subTitle, title, description }) => {
  return (
    <Wrapper className="section">
      <div className="title">
        {subTitle && <>{subTitle}</>}

        {title && <h1>{title}</h1>}
        <div className="title-underline"></div>

        {description && <p className="description">{description}</p>}
      </div>
    </Wrapper>
  );
};

export const Wrapper = styled.header`
  background: var(--primary-1);
  text-align: center;

  .subtitle {
    margin: 0 auto 0.5rem;
    span {
      font-weight: 700;
    }
  }

  .title {
    margin-bottom: 0;
  }

  .description {
    margin: 1rem auto 0;
  }
`;

export default PageTitle;
