import { useReducer } from "react";
import { clientAxios } from "../../config/axios";
import { types } from "../../types/types";
import { projectContext } from "./projectsContext";
import { projectsReducer } from "./projectsReducer";

export const ProjectsState = props => {

    const initialState = {
        newProjects: false,
        projects: [],
        projectSelected: null,
        msg: null
    }

    const [state, dispatch] = useReducer(projectsReducer, initialState);

    const showFormNewProject = () => {
        dispatch({
            type: types.uiShowForm
        })
    };

    const addNewProject = async (project) => {

        try {

            const res = await clientAxios.post('/api/project', project)
            dispatch({
                type: types.projectAddNew,
                payload: res.data.project
            })

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                categorie: 'alerta-error'
            }
            dispatch({
                type: types.projectMsg,
                payload: alert
            })
        }

    }

    const getProjectByUser = async () => {

        try {

            const res = await clientAxios.get('/api/project')
            dispatch({
                type: types.projectGet,
                payload: res.data.projects
            })

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                categorie: 'alerta-error'
            }
            dispatch({
                type: types.projectMsg,
                payload: alert
            })
        }

    };

    const selectedProjectActivate = (project) => {
        dispatch({
            type: types.projectActivated,
            payload: project
        })
    };

    const deleteProject = async (project) => {

        try {

            await clientAxios.delete(`/api/project/${project._id}`)
            dispatch({
                type: types.projectDeleted,
                payload: project._id
            })

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                categorie: 'alerta-error'
            }
            dispatch({
                type: types.projectMsg,
                payload: alert
            })
        }

    }

    const clearStateProject = () => {
        dispatch({
            type: types.projectClear
        })
    }

    return (
        <projectContext.Provider
            value={{
                state,
                showFormNewProject,
                addNewProject,
                selectedProjectActivate,
                deleteProject,
                getProjectByUser,
                clearStateProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )

}