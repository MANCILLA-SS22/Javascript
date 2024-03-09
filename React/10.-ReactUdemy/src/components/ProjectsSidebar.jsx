import React from 'react'
import Button from './Button';

function ProjectsSidebar({onStartAddProject, projects, onSelectProject, selectedProjectId}) {

    const res = projects.map(function(event){
        
        let classes = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:vg-stone-800";
        projects.id === selectedProjectId ? classes += " bg-stone-800 text-stone-200" : classes += " text-stone-400";
        return(
            <li key={event.id}>
                <button className={classes} onClick={() => onSelectProject(event.id)}>{event.title}</button>
            </li>
        )
    })

    return (
        <aside className='w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
            <h2 className='mb-8 font-bold uppercase md:text-xl text-stone-200'>Your Projects</h2>
            <div>
                <Button onClick={onStartAddProject}>
                    + AddProject
                </Button>
            </div>
            <ul className='mt-8'>
                {res}
            </ul>
        </aside>
    )
}

export default ProjectsSidebar;