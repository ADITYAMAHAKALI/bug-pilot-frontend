import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext, useAuthContext } from '../context';
import { FormAlert } from '../components';

const Register = () => {
  // context
  const { formAlert } = useGlobalContext();
  const { formDetails, setFormDetails, handleRegister } = useAuthContext();

  return (
    <Wrapper>
      <div className="section-center">
        <form className="form" onSubmit={handleRegister}>
          <h2>Sign Up</h2>

          {formAlert.isFormAlertOpen && (
            <FormAlert alertMsg={formAlert.message} />
          )}

          <div className="form-row">
            <label htmlFor="username" className="form-label">
              username
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              required
              value={formDetails.username}
              onChange={(e) => {
                setFormDetails({ ...formDetails, username: e.target.value });
              }}
            />
          </div>

          <div className="form-row">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              required
              type="email"
              className="form-input"
              id="email"
              name="email"
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
              required
              type="password"
              className="form-input"
              id="password"
              name="password"
              autoComplete="off"
              value={formDetails.password}
              onChange={(e) => {
                setFormDetails({ ...formDetails, password: e.target.value });
              }}
            />
          </div>

          <button type="submit" className="btn btn-block">
            Sign Up
          </button>

          <p className="form-info">
            Already have an account? <Link to="/login">Login</Link>
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

export default Register;
