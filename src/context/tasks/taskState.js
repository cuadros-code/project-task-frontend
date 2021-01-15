import { useReducer } from "react"
import { clientAxios } from "../../config/axios";
import { types } from "../../types/types";
import { taskContext } from "./taskContext";
import { taskReducer } from "./taskReducer"


export const TaskState = props => {

    const initialState = {
        tasksByProject: [],
        taskActivated: null
    }

    const [state, dispatch] = useReducer(taskReducer, initialState);


    const filterTask = async (projectId) => {

        try {

            const res = await clientAxios.get('/api/task', { params: { projectId } })

            dispatch({
                type: types.taskFilterById,
                payload: res.data.task
            })

        } catch (error) {

            console.log(error.response)

        }


    };

    const addNewTask = async (project) => {

        try {

            const res = await clientAxios.post('/api/task', project)

            dispatch({
                type: types.taskAddNew,
                payload: res.data.newTask
            })

        } catch (error) {
            console.log(error.response)
        }

    };

    const deleteTask = async (task) => {

        try {

            await clientAxios.delete(
                `/api/task/${task._id}`,
                { params: { projectId: task.projectId } })

            dispatch({
                type: types.taskDelete,
                payload: task._id
            })
            
        } catch (error) {
            console.log(error.response)

        }


    };

    const editTask = async (task) => {

        try {

            const res = await clientAxios.put(`/api/task/${task._id}`, task)

            dispatch({
                type: types.taskEdit,
                payload: res.data.newTask
            })

        } catch (error) {
            console.log(error.response)
        }

    };

    const addEditedTask = (task) => {
        dispatch({
            type: types.taskComplet,
            payload: task
        })
    };

    const clearStateTask = () => {
        dispatch({
            type: types.taskClear
        })
    }


    return (
        <taskContext.Provider
            value={{
                state,
                filterTask,
                addNewTask,
                deleteTask,
                editTask,
                addEditedTask,
                clearStateTask
            }}
        >
            {props.children}
        </taskContext.Provider>
    )

} 