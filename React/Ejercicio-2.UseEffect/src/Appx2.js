import React, { useEffect, useState } from 'react'

function Appx2() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    function handleResize(){
        setWindowWidth(window.innerWidth);
    }

    useEffect(function(){
        window.addEventListener("resize", handleResize);

        return function(){
            window.removeEventListener("resize", handleResize);
        }

    }, [])

    return (
        <div>
            {windowWidth}
        </div>
    )
}

export default Appx2