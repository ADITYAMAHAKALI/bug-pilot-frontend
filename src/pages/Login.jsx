import React, { useState } from 'react';
import { useGlobalContext } from '../context';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormAlert } from '../components';

const Login = () => {
  const { setUser, SERVER_URL, openFormAlert, formAlert } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //\------------------- user Api -------------------//
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

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginObj = {
      email: email,
      password: password,
    };

    await fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginObj),
    }).then(async (res) => {
      console.log('res', res);
      if (res.status === 200) {
        const data = await res.json();
        // we will get the user id
        const new_user = await getUser(data.id);
        console.log('new_user', new_user);
        await setUser(new_user);
        localStorage.setItem('user', JSON.stringify(new_user));
        navigate('/dashboard');
      } else {
        console.log('Login Failed');
        openFormAlert('Wrong Email or Password');
      }
    });
  };

  return (
    <Wrapper>
      <div className="section-center">
        <form className="form" onSubmit={handleLogin}>
          <h2>login</h2>

          {
            // if the form alert is open then we want to show the alert
            formAlert.isFormAlertOpen && (
              <FormAlert alertMsg={formAlert.message} />
            )
          }

          <div className="form-row">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              id="email"
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
