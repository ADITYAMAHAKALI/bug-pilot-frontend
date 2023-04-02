import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formAlert, setFormAlert] = useState({
    isFormAlertOpen: false,
    message: '',
  });

  // # Functions
  // sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // local storage
  const getLocalStorage = (key) => {
    let value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  };

  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // form alert
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
        getLocalStorage,
        setLocalStorage,
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
