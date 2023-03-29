import React, { useState, useContext } from 'react';
import { useEffect } from 'react';

const BugsContext = React.createContext();

const BugsProvider = ({ children }) => {
  const [modalStage, setModalStage] = useState('add');
  const [bugs, setBugs] = useState([]);
  const [bug, setBug] = useState({
    bugId: null,
    bugTitle: '',
    // bugDescription: '',
    bugAuthor: '',
    bugLabel: '',
    bugStatus: 'open',
  });

  // clear current bug
  const clearBug = () => {
    setBug({
      bugId: null,
      bugTitle: '',
      // bugDescription: '',
      bugAuthor: '',
      bugLabel: '',
      bugStatus: 'open',
    });
  };

  // handle bug submit
  const handleBugSubmit = () => {
    if (modalStage === 'add') {
      addBug(bug);
    } else if (modalStage === 'edit') {
      editBug(bug);
    }

    clearBug();
  };

  // add new bug
  const addBug = async (bug) => {
    try {
      const response = await fetch('http://localhost:9090/api/bug/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bug,
          open: bug.bugStatus.toLowerCase().trim() === 'open' ? true : false,
        }),
      });
      const data = await response.json();
      setBugs([...bugs, data]);
    } catch (error) {
      console.log(error);
    }
  };

  // edit bug
  const editBug = async (bug) => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/bug/${bug.bugId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bug),
        }
      );
      const data = await response.json();
      setBugs(
        bugs.map((bug) => {
          return bug.bugId === data.id ? { ...data } : bug;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // delete bug
  const deleteBug = async (id) => {
    try {
      await fetch(`http://localhost:9090/api/bug/${id}/`, {
        method: 'DELETE',
      });
      setBugs(bugs.filter((bug) => bug.bugId !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // get all bugs
  const getBugs = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/bug/');
      const data = await response.json();
      setBugs(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get single bug
  const getBug = async (id) => {
    try {
      const response = await fetch(`http://localhost:9090/api/bug/${id}`);
      const data = await response.json();
      setBug({
        ...data,
        bugStatus: data.open ? 'open' : 'closed',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BugsContext.Provider
      value={{
        modalStage,
        setModalStage,
        bugs,
        bug,
        setBug,
        clearBug,
        handleBugSubmit,
        getBugs,
        getBug,
        addBug,
        editBug,
        deleteBug,
      }}
    >
      {children}
    </BugsContext.Provider>
  );
};

const useBugsContext = () => {
  return useContext(BugsContext);
};

export { useBugsContext, BugsProvider };
