import React, { useState, useContext } from 'react';
import { projectsData } from '../utils/data';

const ProjectContext = React.createContext();

const ProjectProvider = ({ children }) => {
  const [modalStage, setModalStage] = useState('add');
  const [projects, setProjects] = useState(projectsData);
  const [project, setProject] = useState({
    projectId: null,
    projectName: '',
    projectDescription: '',
  });

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
    if (!project.projectName || !project.projectDescription) {
      alert('Please fill out all fields');
      return;
    }

    if (modalStage === 'add') {
      addProject(project);
    } else if (modalStage === 'edit') {
      editProject(project);
    }

    clearProject();
  };

  // get all projects
  const getProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get single project
  const getProject = async (id) => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  // add new project
  const addProject = async (project) => {
    console.log('add project', project);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      const data = await response.json();
      setProjects([...projects, data]);
    } catch (error) {
      console.log(error);
    }
  };

  // edit project
  const editProject = async (project) => {
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      const data = await response.json();
      setProjects(
        projects.map((project) => {
          return project.id === data.id ? { ...data } : project;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // delete project
  const deleteProject = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      setProjects(projects.filter((project) => project.id !== id));
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
