import React, { useState, useContext } from 'react';
import { projectsData } from '../utils/data';
import { useGlobalContext } from '../context';
import { Navigate } from 'react-router-dom';
const ProjectContext = React.createContext();

const ProjectProvider = ({ children }) => {
  const [modalStage, setModalStage] = useState('add');
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const { user } = useGlobalContext();

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

  // get all projects
  const getProjects = async () => {
    try {
      const id = user.id
      const response = await fetch(`/api/${id}/project`);
      const data = await response.json();
      setProjects(data);
     // console.log('data', data)
    } catch (error) {
      console.log(error);
    }
  };

  // get single project
  const getProject = async (id) => {
    try {
      const response = await fetch(`/api/${user?.id}/project/${id}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  // add new project
  const addProject = async (project) => {
    const apiObj = {
      "projectName": project.projectName,
      "projectDescription": project.projectDescription,
    }
    console.log('apiObj', apiObj)
    try {
      if(user!== undefined){
        const response = await fetch(`/api/${user.id}/project`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiObj),
        });
        console.log('response', response)
        const data = await response.json();
        setProjects([...projects, data]);
        alert('Project added successfully');
      }else{
        console.log('user is not login ')
        Navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  // edit project
  const editProject = async (project) => {
    const apiObj = {
      "projectName": project.projectName,
      "projectDescription": project.projectDescription,
    }
    console.log('project', JSON.stringify(project))
    console.log('project', JSON.stringify(apiObj))

    try {
      const response = await fetch(`/api/${user.id}/project/${project.projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiObj),
      });
      const data = await response.json();
      console.log('data', data)
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
      const response = await fetch(`/api/${user.id}/project/${id}`, {
        method: 'DELETE',
      });
      console.log('response', response)
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
