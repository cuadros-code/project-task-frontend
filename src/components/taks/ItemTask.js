import React, { useContext } from 'react'
import { projectContext } from '../../context/projects/projectsContext';
import { taskContext } from '../../context/tasks/taskContext';

export const ItemTask = ({task}) => {

    const { deleteTask, filterTask , editTask, addEditedTask} = useContext(taskContext);
    const { state: { projectSelected } } = useContext(projectContext);

    const handleDeleteTask = () => {
        deleteTask(task)
        filterTask(projectSelected[0]._id)
    };

    const handleStateTask = () => {
        task.status = !task.status
        editTask( task );
    };

    const handleEditTask = () => {
        addEditedTask(task)
    };

    return (
        <li className="tarea sombra">
            <p>{ task.name }</p>
            <div className="estado">
                {
                    task.status
                    ?
                    <button 
                        className="completo"
                        type="button"
                        onClick={handleStateTask}
                    >
                        Complet
                    </button>
                    :
                    <button 
                    className="incompleto"
                    type="button"
                    onClick={handleStateTask}
                    >
                        Incomplet
                    </button>
                }
            </div>

            <div className="acciones">
                <button
                type="button"
                className="btn btn-primario"
                onClick={handleEditTask}
                >
                    Edit
                </button>
                <button
                type="button"
                className="btn btn-secundario"
                onClick={handleDeleteTask}
                >
                    Delete
                </button>
            </div>
        </li>
    )
}
