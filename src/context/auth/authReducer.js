import { types } from "../../types/types";

export const authReducer = (state, action) => {

    switch (action.type) {

        case types.registerSuccess:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                msg: null,
                authenticated: true
            }
        case types.loginError:
        case types.registerError:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                msg: action.payload
            }
        
        case types.loginLoading:
            return {
            ...state,
            loading : true
            }

        case types.loginSuccess:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                msg: null,
                authenticated: true,
                loading : false
            }

        case types.getUser:
            return {
                ...state,
                authenticated: true,
                user: action.payload
            }

        case types.closeSession:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                authenticated: false
            }
        default:
            return state;
    }

}