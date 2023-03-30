import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <form className="form">
          <h2>login</h2>

          <div className="form-row">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input type="email" id="email" className="form-input" required />
          </div>

          <div className="form-row">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn btn-block">
            login
          </button>

          <p className="form-info">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

export const Wrapper = styled.section`
  height: 100%;
  display: grid;
  place-items: center;

  .form h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .form-info {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 1.5rem;
    margin-bottom: 0;

    a {
      color: var(--primary-5);
      font-weight: 600;
    }
  }
`;

export default Login;
