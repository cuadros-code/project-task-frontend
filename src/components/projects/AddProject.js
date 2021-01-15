import React, { useContext, useState } from 'react'
import { projectContext } from '../../context/projects/projectsContext';

const initialState = {
    name: ''
};

export const AddProject = () => {

    const { state: { newProjects }, showFormNewProject, addNewProject } = useContext(projectContext);

    const [errorAlert, setErrorAlert] = useState(false);
    const [formValue, setFormValue] = useState(initialState)
    const { name } = formValue;

    const handleOnChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim().length <= 0) return setErrorAlert(true);

        setErrorAlert(false);
        setFormValue(initialState);
        addNewProject({
            ...formValue,
            id: new Date().getTime()
        })

    };

    const handleShowForm = () => {
        showFormNewProject()
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario btn-hover"
                onClick={handleShowForm}
            >
                Add Project
            </button>
            {
                newProjects
                &&

                <form
                    onSubmit={handleSubmit}
                    className="formulario-nuevo-proyecto"
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Project Name"
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                        autoComplete="off"
                    />

                    <button
                        type="submit"
                        className="btn-btn btn-primario btn-block btn-hover"
                    >
                        Create Project
            </button>
                    {
                        errorAlert
                        &&
                        <p className="error">Invalid name</p>
                    }
                </form>
            }


        </>
    )
}
