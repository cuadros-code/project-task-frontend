import React, { useContext, useEffect } from 'react'
import { projectContext } from '../../context/projects/projectsContext';
import { ItemListProject } from './ItemListProject'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { alertContext } from '../../context/alert/alertContext';

export const ListProjects = () => {

    const { state: { projects, msg }, getProjectByUser } = useContext(projectContext);

    const { state:{ alert }, showAlert } = useContext(alertContext)

    useEffect(() => {
        if(msg) showAlert( msg.msg, msg.categorie )

        getProjectByUser()
        // eslint-disable-next-line
    }, [msg])

    if (projects.length === 0) return null;

    return (
        <ul className="listado-proyectos">
            {
                alert
                &&
                (
                    <div className={`alerta ${alert.categorie}`}>{alert.msg}</div>
                )
            }
            {
                <TransitionGroup>
                    {projects.map(project => (
                        <CSSTransition
                            key={project._id}
                            timeout={300}
                            classNames="tarea"
                        >
                            <ItemListProject
                                project={project}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            }
        </ul>
    )
}
