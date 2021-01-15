import { types } from "../../types/types";

export const taskReducer = (state, action) => {

    switch (action.type) {
        case types.taskFilterById:
            return {
                ...state,
                tasksByProject: action.payload
            }

        case types.taskAddNew:
            return {
                ...state,
                tasksByProject: [...state.tasksByProject, action.payload]
            }

        case types.taskDelete:
            return {
                ...state,
                tasksByProject: state.tasksByProject.filter(task => task._id !== action.payload)
            }
        case types.taskEdit:
            return {
                ...state,
                tasksByProject: [...state.tasksByProject, action.payload],
                taskActivated: null
            }
        case types.taskComplet:
            return {
                ...state,
                taskActivated: action.payload
            }
        case types.taskClear:
            return {
                tasksByProject: [],
                taskActivated: null
            }

        default:
            return state;
    }

}