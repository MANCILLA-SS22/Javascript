import React, { useEffect, useState } from 'react'

function App() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    function handleResize(){
        setWindowWidth(window.innerWidth);
    }

    useEffect(function(){
        window.addEventListener("resize", handleResize);

        return function(){ //This is a cleanup function
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return (
        <div>
            {windowWidth}
        </div>
    )
}

export default App