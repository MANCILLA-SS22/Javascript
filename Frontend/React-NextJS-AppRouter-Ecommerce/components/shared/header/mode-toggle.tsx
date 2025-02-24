'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ModeToggle() {
    const [mounted, setMounted] = useState(false); //Before mounted is true, nothing is rendered.
    const { theme, setTheme } = useTheme();

    useEffect(() => { //useEffect runs after the component mounts.
        setMounted(true); //It sets mounted to true, signaling that the component is now safely running in the browser.
    }, []); //The empty dependency array [] means it runs only once, after the first render.

    //If mounted is false, the component returns null, meaning nothing is rendered. This prevents Next.js from rendering the theme-related UI before the component mounts. 
    //This is necessary because useTheme() (from next-themes) relies on window, which is only available on the client side.
    if (!mounted) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                    {theme === 'system' ? (<SunMoon />) : theme === 'dark' ? (<MoonIcon />) : (<SunIcon />)}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={theme === 'system'} onClick={() => setTheme('system')} >System</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={theme === 'dark'} onClick={() => setTheme('dark')} >Dark</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={theme === 'light'} onClick={() => setTheme('light')} >Light</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );;
}

export default ModeToggle;

//Next.js renders components on the server before hydrating them in the browser. Since next-themes relies on the window object (which isn't available on the server), useEffect ensures theme-related UI elements 
//only render after the component is mounted.