import React, { useContext, useEffect } from 'react'
import { authContext } from '../../context/auth/authContext'
import { projectContext } from '../../context/projects/projectsContext'
import { NavBar } from '../layout/NavBar'
import { Sidebar } from '../layout/Sidebar'
import { FormAddEditTask } from '../taks/FormAddEditTask'
import { ListTask } from '../taks/ListTask'

export const ProjectsScreen = () => {

    const { state: { projectSelected } } = useContext(projectContext);

    const { state: { user }, getUserIsAuthenticated } = useContext(authContext)

    useEffect(() => {
        if (!user) {
            getUserIsAuthenticated()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">
                <NavBar />

                <main>
                    {
                        (projectSelected)
                            ?
                            <>
                                <FormAddEditTask />

                                <div className="contenedor-tareas">
                                    <ListTask />
                                </div>
                            </>
                            : <h2 className="select" >Select a project</h2>
                    }


                </main>
            </div>
        </div>
    )
}
