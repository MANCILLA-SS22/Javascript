import React, {Fragment, useState} from 'react';
import AddUser from './components/Users/AddUsers';
import UsersList from './components/Users/UsersList';

function App() {

  const [usersList, seUsersList] = useState([]);

  function AddUserHandler(uName, uAge){
    seUsersList(function(prevUsersList){
      return [...prevUsersList, {name: uName, age: uAge, id: Math.random().toString()}]
    });
  }

  return (
    <Fragment>
      <AddUser onAddUser={AddUserHandler}/>
      <UsersList users={usersList}/>
    </Fragment>
  );
}

export default App;
