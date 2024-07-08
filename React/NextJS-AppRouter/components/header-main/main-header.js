import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from '../header-background/main-header-background';
import NavLink from '../nav-link/nav-link';

function MainHeader() {
    return <>
        <MainHeaderBackground/>
        <header className={classes.header}>
            <Link className={classes.logo} href="/">
                <Image src={logoImg} alt="A plate with food on it" priority /> NextLevel Food 
            </Link>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink href="/meals"></NavLink>
                    </li>
                    <li>
                        <NavLink href="/community"></NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </>
};

export default MainHeader;

//We use separate components here so we can use 'use client' in other file that will be used only to execute client-side components. This way, we avoiud this main-header 
//component to be converted to a client component and is therefore still rendered on the server. And instead only the <li> parts are rendered on the client.

//We use "priority" to make sure that this is loaded with priority and hence we avoid "lazy loading