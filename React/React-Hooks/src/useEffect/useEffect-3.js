import React, { useEffect, useState } from "react";

function ClicksCounter() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    function handleClick(){
      console.log("HandleClick");
      setClicks(function(prevClicks){
        return prevClicks + 1;
      });
    };

    document.addEventListener("click", handleClick);

    return function(){
      document.removeEventListener("click", handleClick)
    }

  }, []);

  return <h1>{clicks}</h1>
}

function App(){
  const [show, setShow] = useState(true);

  return (
    <div>
      {show && <ClicksCounter/>}
      <button onClick={() => setShow(!show)}>Mostrat/Ocultar</button>
    </div>
  )
}

export default App;