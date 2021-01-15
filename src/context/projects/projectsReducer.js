import { types } from "../../types/types"

export const projectsReducer = (state, action) => {

    switch (action.type) {

        case types.uiShowForm:
            return {
                ...state,
                newProjects: true
            }
        case types.uiCloseForm:
            return {
                ...state,
                state: false
            }
        case types.projectAddNew:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                newProjects: false
            }
        case types.projectActivated:
            return {
                ...state,
                projectSelected: state.projects.filter(project => project._id === action.payload._id)
            }
        case types.projectDeleted:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                projectSelected: null
            }
        case types.projectGet:
            return {
                ...state,
                projects: action.payload
            }

        case types.projectMsg:
            return {
                ...state,
                msg: action.payload
            }
        case types.projectClear:
            return {
                newProjects: false,
                projects: [],
                projectSelected: null,
                msg: null
            }
        default:
            return state
    }

}