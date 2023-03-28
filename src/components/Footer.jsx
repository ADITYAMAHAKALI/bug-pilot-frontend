import React from 'react';
import styled from 'styled-components';
const Footer = () => {
  return (
    <Wrapper>
      <p>
        &copy;{new Date().getFullYear()}
        <span> BugPilot</span> | All rights reserved.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--black);
  text-align: center;
  span {
    color: var(--primary-5);
  }
  p {
    color: var(--white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;

export default Footer;
