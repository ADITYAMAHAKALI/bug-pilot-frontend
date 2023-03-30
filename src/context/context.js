import React, { useState, useEffect } from 'react';
import { useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const SERVER_URL = 'http://localhost:9090';
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formAlert, setFormAlert] = useState({
    isFormAlertOpen: false,
    message: '',
  });

  // get user if it exists in local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('the user is', user);
    if (user) {
      setUser(user);
    }
  }, []);

  // # Functions
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openFormAlert = (msg) => {
    setFormAlert({ isFormAlertOpen: true, message: msg });

    setTimeout(() => {
      closeFormAlert();
    }, 3000);
  };

  const closeFormAlert = () => {
    setFormAlert({ isFormAlertOpen: false, message: '' });
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isModalOpen,
        openModal,
        closeModal,
        formAlert,
        openFormAlert,
        closeFormAlert,
        user,
        setUser,
        SERVER_URL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
