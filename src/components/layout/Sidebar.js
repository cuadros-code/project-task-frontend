import React from 'react'
import { AddProject } from '../projects/AddProject'
import { ListProjects } from '../projects/ListProjects'

export const Sidebar = () => {
    return (
        <aside id="aside">
            <h1>SAVE <span>Tasks</span></h1>
            <AddProject />

            <div className="proyectos">
                <h2>Your Proyects</h2>
                <ListProjects />
            </div>
        </aside>
    )
}
