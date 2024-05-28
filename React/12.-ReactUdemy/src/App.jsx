import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, //undefined means that we're doing nothing
    projects: [],
    tasks: []
  });

  const selectedProject = projectsState.projects.find(event => event.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks}/>;
  if(projectsState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProyect} onCancel={handleCancelAddProject}/>;
  }else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  function handleAddTask(text){
    setProjectsState(prevState => {

      const textId = Math.random();

      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: textId
      }

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id){
    setProjectsState(function(prevState){
      return {
        ...prevState,
        tasks: prevState.tasks.filter(event => event.id !== id) // "event.id" and "prevState.selectedProjectId" have the same id. So, every time filter is executed, it'll only show nothing because both id's are the same. That's to say, it won't filter anything.
      };
    });
  }

  function handleDeleteProject(){
    setProjectsState(function(prevState){
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(event => event.id !== prevState.selectedProjectId) // "event.id" and "prevState.selectedProjectId" have the same id. So, every time filter is executed, it'll only show nothing because both id's are the same. That's to say, it won't filter anything.
      };
    });
  }
  
  function handleSelectProject(id){
    setProjectsState(function(prevState){
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }
  
    function handleStartAddProject() {
    setProjectsState(function(prevState){
      return {
        ...prevState,
        selectedProjectId: null, //null means that we're adding a new project
      };
    });
  }

  function handleCancelAddProject(){
    setProjectsState(function(prevState){
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  
  function handleAddProyect(projectData){
    setProjectsState(prevState => {

      const projectId = Math.random();

      const newProject = {
        ...projectData,
        id: projectId
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId}/>
        {content}
      </main>
    </>
  );
}

export default App;
