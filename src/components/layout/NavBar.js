import React, { useContext } from 'react'
import { authContext } from '../../context/auth/authContext'
import { projectContext } from '../../context/projects/projectsContext'
import { taskContext } from '../../context/tasks/taskContext'

export const NavBar = () => {

    const { state: { user }, closeSession } = useContext(authContext)
    const { clearStateProject } = useContext(projectContext)
    const { clearStateTask } = useContext(taskContext)

    const handleCloseSession = () => {
        closeSession()
        clearStateProject()
        clearStateTask()
    }

    return (
        <header className="app-header">
            <p className="nombre-usuario">Hello <span>{user && user.name}</span> </p>

            <nav className="nav-principal">
                <button
                    className="btn btn-primario btn-hover"
                    onClick={handleCloseSession}
                >
                    Logout
                </button>
            </nav>

        </header>
    )
}
