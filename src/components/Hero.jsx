import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroImg from '../assets/heroImg.png';

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          Don't let <span>bugs</span> get the best of you
        </h1>
        <p>
          Furniture is one such part of our homes that cannot be missed out in
          any of the cases. It makes our home aesthetically valuable by giving
          us all the comfort and relaxation that we desire. Certainly, one
          cannot deny the fact that a home is not complete without the right set
          of furniture.
        </p>
        <div className="btn-container">
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline">
            Sign Up
          </Link>
        </div>
      </article>

      <article className="img-container">
        <img src={heroImg} alt="hero-image" className="hero-img" />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  place-items: center;

  .img-container {
    display: none;
  }

  .btn-container {
    display: flex;
    gap: 1rem;
  }

  .btn.d {
    margin-top: 1rem;
    padding: 0.1rem 0.5rem;
    background: var(--black);
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 8rem;

    h1 {
      text-shadow: 0 0 1px var(--black);
    }

    h1 span {
      color: var(--primary-5);
      text-shadow: 0 0 2px var(--primary-5);
    }

    .img-container {
      display: block;
      position: relative;
    }

    .hero-img {
      width: 100%;
      height: 550px;
      display: block;
      object-fit: cover;
    }
  }
`;

export default Hero;
