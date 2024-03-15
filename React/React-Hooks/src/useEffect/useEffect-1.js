import React, { useEffect, useState } from "react"

function App() {
  const [resourceType, setResourceType] = useState("Posts");
  const [items, setItems] = useState([]);
  
  useEffect(function(){
    console.log("resource changed");

    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then(response => response.json())
      .then(json => setItems(json));

    return function(){
      console.log("Return from resource change");
    }

  }, [resourceType]); //Every time this variable change, this useEffect will be executed

  return (
    <>
      <div>
        <button onClick={() => setResourceType("Posts")}>Posts</button>
        <button onClick={() => setResourceType("Users")}>Users</button>
        <button onClick={() => setResourceType("Comments")}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
      {
        items.map(function(item){
          return <pre>{JSON.stringify(item)}</pre>
        })
      }
    </>
  );
}

export default App;
