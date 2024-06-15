import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from "./MainNavigation.module.css"

function MainNavigation(){
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        {/* end: This indicates that this link should only be considered active if the currently active route ends with this path after the URL. So now this link 
                        will only be considered active if we are on our domain slash nothing and not if we're on slash products. */}
                        <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined } end={true}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({isActive}) => isActive ? classes.active : undefined }>Products</NavLink>
                    </li>                    
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;

