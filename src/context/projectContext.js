import React, { useState, useContext } from 'react';
import { useAuthContext } from '../context';
import { Navigate } from 'react-router-dom';
import { SERVER_URL } from '../utils/constants';

const ProjectContext = React.createContext();

const ProjectProvider = ({ children }) => {
  // context
  const { user } = useAuthContext();

  // state
  const [modalStage, setModalStage] = useState('add');
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    projectId: null,
    projectName: '',
    projectDescription: '',
  });

  // # Functions
  // clear current project
  const clearProject = () => {
    setProject({
      projectId: null,
      projectName: '',
      projectDescription: '',
    });
  };

  // handle project submit
  const handleProjectSubmit = () => {
    if (modalStage === 'add') {
      addProject(project);
    } else if (modalStage === 'edit') {
      editProject(project);
    }

    clearProject();
  };

  // get projects
  const getProjects = async () => {
    try {
      const id = user.id;
      const response = await fetch(`${SERVER_URL}/api/${id}/project`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get single project
  const getProject = async (id) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/${user?.id}/project/${id}`
      );
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  // add project
  const addProject = async (project) => {
    const apiObj = {
      projectName: project.projectName,
      projectDescription: project.projectDescription,
    };

    try {
      if (user !== undefined) {
        const response = await fetch(`${SERVER_URL}/api/${user.id}/project`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiObj),
        });
        const data = await response.json();
        setProjects([...projects, data]);
      } else {
        Navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // edit project
  const editProject = async (project) => {
    const apiObj = {
      projectName: project.projectName,
      projectDescription: project.projectDescription,
    };

    try {
      const response = await fetch(
        `${SERVER_URL}/api/${user.id}/project/${project.projectId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiObj),
        }
      );
      const data = await response.json();
      setProjects(
        projects.map((project) => {
          return project.projectId === data.id ? { ...data } : project;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // delete project
  const deleteProject = async (id) => {
    try {
      await fetch(`${SERVER_URL}/api/${user.id}/project/${id}`, {
        method: 'DELETE',
      });
      setProjects(projects.filter((project) => project.projectId !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        modalStage,
        setModalStage,
        projects,
        project,
        setProject,
        clearProject,
        handleProjectSubmit,
        getProjects,
        getProject,
        addProject,
        editProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

const useProjectContext = () => {
  return useContext(ProjectContext);
};

export { useProjectContext, ProjectProvider };
