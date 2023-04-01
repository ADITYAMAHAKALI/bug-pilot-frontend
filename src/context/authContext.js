import React, { useState, useContext } from 'react';
import { SERVER_URL } from '../utils/constants';
import { useGlobalContext } from './context';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // context
  const { getLocalStorage, setLocalStorage, openFormAlert, closeSidebar } =
    useGlobalContext();

  // state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [formDetails, setFormDetails] = useState({
    username: '',
    email: '',
    password: '',
  });

  // # Functions
  // register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDetails),
      });
      const data = await response.json();
      const newUser = await getUser(data.id);
      setUser(newUser);
      setLocalStorage('user', newUser);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      openFormAlert('Username or email already exists');
    }

    clearFormDetails();
  };

  // login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDetails),
      });
      const data = await response.json();
      const newUser = await getUser(data.id);
      setUser(newUser);
      setLocalStorage('user', newUser);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      openFormAlert('Invalid username or password');
    }

    clearFormDetails();
  };

  // logout
  const handleLogout = () => {
    setUser(null);
    setLocalStorage('user', null);
    navigate('/');
    closeSidebar();
  };

  // get user
  const getUser = async (id) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/users/${id}`);
      const data = await response.json();
      const newUser = {
        id: data.userId,
        email: data.email,
        username: data.username,
      };
      return newUser;
    } catch (error) {
      console.log(error);
    }
  };

  // clear form details
  const clearFormDetails = () => {
    setFormDetails({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        formDetails,
        setFormDetails,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };
