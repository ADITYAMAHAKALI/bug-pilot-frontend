import aboutImg from '../assets/aboutImg.png';
import styled from 'styled-components';

const About = () => {
  return (
    <Wrapper className="section section-center">
      <article className="about-img">
        <img src={aboutImg} alt="about" />
      </article>
      <article>
        <div className="title">
          <h2>about us</h2>
          <div className="title-underline"></div>
        </div>
        <p>
          BugPilot is an open-source project aimed at providing an intuitive and
          user-friendly web-based interface for tracking and managing software
          bugs. The app is built using popular web technologies such as React,
          Context API, MySQL, and Spring Boot, making it highly customizable and
          flexible.
        </p>
        <p>
          One of the key benefits of using BugPilot is that it provides a simple
          and intuitive interface for managing bugs. You can easily create,
          view, and update bugs, assign them to team members, and track their
          progress. Additionally, you can create projects, add team members, and
          manage access control to ensure that only authorized users can access
          sensitive data.
          <br />
          Overall, BugPilot is a valuable tool for any software development team
          that wants to streamline their bug tracking and management processes.
          With its easy-to-use interface, flexibility, and extensibility, it can
          help you save time and effort while improving the quality of your
          software. So why not give it a try and see how it can benefit your
          team today!
        </p>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  place-items: center;
  gap: 4rem;

  .about-img {
    border-radius: var(--borderRadius);
    max-height: 500px;
  }

  img {
    width: 100%;
    border-radius: var(--borderRadius);
    object-fit: cover;
  }

  p {
    line-height: 2;
    text-transform: normal;
  }
  .title {
    text-align: left;
  }
  .title-underline {
    margin-left: 0;
  }

  @media (min-width: 992px) {
    grid-template-columns: 40% 1fr;
  }
`;

export default About;
