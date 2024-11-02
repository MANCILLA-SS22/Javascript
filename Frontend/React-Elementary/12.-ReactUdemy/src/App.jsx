import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({selectedProjectId: undefined, projects: [], tasks: []}); //undefined means that we're doing nothing 
  const selectedProject = projectsState.projects.find(event => event.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onDelete={handleDeleteProject} tasks={projectsState.tasks}/>;
  if(projectsState.selectedProjectId === null) content = <NewProject onAdd={handleAddProyect} onCancel={handleCancelAddProject} />;
  if(projectsState.selectedProjectId === undefined) content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;

  function handleAddTask(text){
    setProjectsState(prevState => {
      const newTask = { text: text, projectId: prevState.selectedProjectId, id: Math.random() }
      
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

  function handleAddProyect(projectData) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, { ...projectData, id: Math.random()} ]
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState(function (prevState) {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }
  
  function handleStartAddProject() {
    setProjectsState(function (prevState) {
      return {
        ...prevState,
        selectedProjectId: null  //null means that we're adding a new project
      };
    });
  }

  function handleSelectProject(id){
    setProjectsState(function(prevState){
      return { 
        ...prevState, 
        selectedProjectId: id
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
