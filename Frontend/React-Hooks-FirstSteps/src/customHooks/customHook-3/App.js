/* //1th method using useCallback()
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTask = useCallback(function(taskObj){
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ 
        id: taskKey, 
        text: taskObj[taskKey].text 
      });
    }

    setTasks(loadedTasks);
  }, []); //We don't have to add anything in the dependency array because we aren't using anything external other than setTasks, which is a state updating function, and these are guaranteed to never change.

  const {isLoading, error, sendRequest:fetchTasks} = useHttp(transformTask);  

  useEffect(() => {
    fetchTasks({url: 'https://ejercicio-8customhooks-x3-default-rtdb.firebaseio.com/tasks.json'});
  }, [fetchTasks]);

  function taskAddHandler (task){
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
    </Fragment>
  );
}

export default App; */

//2th method without using useCallback()
import React, { Fragment, useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const {isLoading, error, sendRequest:fetchTasks} = useHttp();

  useEffect(() => {
    function transformTask (taskObj){
      const loadedTasks = [];
  
      for (const taskKey in taskObj) {
        loadedTasks.push({ 
          id: taskKey, 
          text: taskObj[taskKey].text 
        });
      }
  
      setTasks(loadedTasks);
    }; 

    fetchTasks({url: 'https://ejercicio-8customhooks-x3-default-rtdb.firebaseio.com/tasks.json'}, transformTask);
  }, [fetchTasks]);

  function taskAddHandler (task){
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
    </Fragment>
  );
}

export default App;