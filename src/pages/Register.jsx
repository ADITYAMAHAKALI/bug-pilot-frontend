import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context';
import { useState } from 'react';
import { FormAlert } from '../components';

const Register = () => {
  const { user, setUser, SERVER_URL, openFormAlert, formAlert } =
    useGlobalContext();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    username: '',
    email: '',
    password: '',
  });

  //------------------- user Api -------------------//
  const getUser = async (id) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/users/${id}`);
      const data = await response.json();
      // console.log('data', data)
      const new_user = {
        id: data.userId,
        email: data.email,
        username: data.username,
      };
      return new_user;
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------- Register -------------------//
  const handleRegister = async (e) => {
    e.preventDefault();
    const registerObj = {
      username: formDetails.username,
      email: formDetails.email,
      password: formDetails.password,
    };

    await fetch(`${SERVER_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerObj),
    }).then(async (res) => {
      console.log('res', res);
      if (res.status === 200) {
        const data = await res.json();
        const new_user = await getUser(data.id);
        console.log('new_user', new_user);
        await setUser(new_user);
        console.log(user);
        localStorage.setItem('user', JSON.stringify(new_user));
        navigate('/dashboard');
      } else {
        console.log('Registration Failed');
        openFormAlert('Username or Email already exists');
      }
    });
  };

  return (
    <Wrapper>
      <div className="section-center">
        <form className="form" onSubmit={handleRegister}>
          <h2>Sign Up</h2>

          {
            // if the form alert is open then we want to show the alert
            formAlert.isFormAlertOpen && (
              <FormAlert alertMsg={formAlert.message} />
            )
          }

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
