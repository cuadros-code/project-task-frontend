import React, { useContext } from 'react'
import { projectContext } from '../../context/projects/projectsContext';
import { taskContext } from '../../context/tasks/taskContext';
import { ItemTask } from './ItemTask'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const ListTask = () => {

    const { state: { tasksByProject } } = useContext(taskContext);

    const { state: { projectSelected: [project] }, deleteProject, } = useContext(projectContext);



    const handleDeleteClick = () => {
        deleteProject(project);
    };

    return (
        <>
            <h2>{project?.name}</h2>
            <ul className="listado-tareas">
                {
                    (tasksByProject.length === 0)
                        ?
                        <li className="tarea"><p>No homework</p></li>
                        :
                        <TransitionGroup>
                            {tasksByProject.map(task => (
                                <CSSTransition
                                    key={task._id}
                                    timeout={300}
                                    classNames="tarea"
                                >
                                    <ItemTask
                                        task={task}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                }
            </ul>

            <button
                className="btn btn-eliminar"
                type="button"
                onClick={handleDeleteClick}
            >
                Delete Project
            </button>
        </>
    )
}
