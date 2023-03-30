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
  const handleBugSubmit = (project) => {
    if (modalStage === 'add') {
      addBug(bug,project);
    } else if (modalStage === 'edit') {
      editBug(bug,project);
    }

    clearBug();
  };

  // add new bug
  const addBug = async (bug,project) => {
    console.log('bug', bug)
    console.log('projecct', project)
    const apiObj = {
      "bugTitle": bug.bugTitle,
      "bugDescription": bug.bugDescription,
      "bugAuthor": project.user.username,
      "bugLabel": bug.bugLabel,
      // "open": bug.bugStatus.toLowerCase().trim() === 'open' ? true : false
    }
    try {
      const response = await fetch(`http://localhost:9090/api/${project.projectId}/bug`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiObj),
      });
      const data = await response.json();
      setBugs([...bugs, data]);
      
    } catch (error) {
      console.log(error);
    }
  };

  // edit bug
  const editBug = async (bug,project) => {
    const apiObj = {
      "bugTitle": bug.bugTitle,
      "bugDescription": bug.bugDescription,
      "bugAuthor": project.user.username,
      "bugLabel": bug.bugLabel,
      "open": bug.bugStatus.toLowerCase().trim() === 'open' ? true : false,
    }
    try {
      const response = await fetch(
        `http://localhost:9090/api/${project.projectId}/bug/${bug.bugId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiObj),
        }
      );
      const data = await response.json();
      setBugs(
        bugs.map((bug) => {
          return bug.bugId === data.id ? { ...data } : bug;
        })
      );
      getBugs(project.projectId)
    } catch (error) {
      console.log(error);
    }
  };

  // delete bug
  const deleteBug = async (id,projectId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/${projectId}/bug/${id}/`, {
        method: 'DELETE',
      });
      console.log('response', response)
      setBugs(bugs.filter((bug) => bug.bugId !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // get all bugs
  const getBugs = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/${projectId}/bug`);
      const data = await response.json();
      setBugs(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get single bug
  const getBug = async (projectId,id) => {
    try {
      const response = await fetch(`http://localhost:9090/api/${projectId}/bug/${id}`);
      const data = await response.json();
      console.log('response', response)
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
