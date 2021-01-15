import React, { useContext, useEffect, useState } from 'react'
import { projectContext } from '../../context/projects/projectsContext';
import { taskContext } from '../../context/tasks/taskContext';

const initialState = {
    name: ''
}

export const FormAddEditTask = () => {

    const { state: { taskActivated }, addNewTask, filterTask, editTask } = useContext(taskContext);

    const { state: { projectSelected } } = useContext(projectContext);

    const [formValue, setFormValue] = useState(initialState)
    const { name } = formValue;

    const [error, setError] = useState(false);

    useEffect(() => {
        if (taskActivated) {
            setFormValue(taskActivated);
        }
    }, [taskActivated])


    const handleOnChange = ({ target }) => {
        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    };

    const handleAddNewTask = (e) => {
        e.preventDefault();
        if (name.trim().length <= 0) return setError(true);

        if (taskActivated) {
            editTask(formValue)
            filterTask(projectSelected[0]._id)
        } else {
            addNewTask({
                ...formValue,
                projectId: projectSelected[0]._id,
            })
        }

        setFormValue(initialState)

        setError(false);
    };

    return (
        <div className="formulario">
            <form
                onSubmit={handleAddNewTask}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task name"
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="contenedor-input">

                    <button
                        type="submit"
                        className="btn btn-primario btn-hover btn-block"
                    >
                        {taskActivated ? 'Edit Task' : 'Add Task'}
                    </button>


                </div>
            </form>

            {
                error
                &&
                <p className="error" >Name task is required</p>
            }
        </div>
    )
}
