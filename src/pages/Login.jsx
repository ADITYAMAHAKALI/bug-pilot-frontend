import styled from 'styled-components';
import { useGlobalContext, useAuthContext } from '../context';
import { Link } from 'react-router-dom';
import { FormAlert } from '../components';

const Login = () => {
  // context
  const { formAlert } = useGlobalContext();
  const { formDetails, setFormDetails, handleLogin } = useAuthContext();

  return (
    <Wrapper>
      <div className="section-center">
        <form className="form" onSubmit={handleLogin}>
          <h2>login</h2>

          {formAlert.isFormAlertOpen && (
            <FormAlert alertMsg={formAlert.message} />
          )}

          <div className="form-row">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-input"
              required
              value={formDetails.email}
              onChange={(e) => {
                setFormDetails({ ...formDetails, email: e.target.value });
              }}
            />
          </div>

          <div className="form-row">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-input"
              required
              value={formDetails.password}
              onChange={(e) => {
                setFormDetails({ ...formDetails, password: e.target.value });
              }}
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
