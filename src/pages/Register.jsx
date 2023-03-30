import styled from 'styled-components';

const Register = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <form className="form">
          <h2>Sign Up</h2>

          <div className="form-row">
            <label htmlFor="username" className="form-label">
              username
            </label>
            <input type="text" id="username" className="form-input" required />
          </div>

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

          <div className="form-row">
            <label htmlFor="confirmPassword" className="form-label">
              confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn btn-block">
            Sign Up
          </button>
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
`;

export default Register;
