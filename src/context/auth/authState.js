import { useReducer } from 'react'
import { authContext } from './authContext'
import { authReducer } from './authReducer'
import { types } from '../../types/types'
import { clientAxios } from '../../config/axios'
import { tokenAuth } from '../../config/tokenAuth'

export const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: undefined,
        user: null,
        msg: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)


    const registerUser = async (dataUser) => {

        try {

            const res = await clientAxios.post('/api/users', dataUser)
            dispatch({
                type: types.registerSuccess,
                payload: res.data
            })
            getUserIsAuthenticated()

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                categorie: 'alerta-error'
            }
            dispatch({
                type: types.registerError,
                payload: alert
            })
        }
    }

    const getUserIsAuthenticated = async () => {

        const token = localStorage.getItem('token')
        if (token) tokenAuth(token)

        try {

            const res = await clientAxios.get('api/auth')
            dispatch({
                type: types.getUser,
                payload: res.data.user
            })

        } catch (error) {
            
            dispatch({
                type: types.loginError,
            })
        }
    }

    const loginUser = async ( dataUser ) => {

        try {

            const res = await clientAxios.post('/api/auth', dataUser)
            dispatch({
                type: types.loginSuccess,
                payload: res.data
            })
            getUserIsAuthenticated()
            
        } catch (error) {
           
            const alert = {
                msg: error.response.data.msg,
                categorie: 'alerta-error'
            }
            dispatch({
                type: types.loginError,
                payload: alert
            })
        }

    }

    const closeSession = () => {

        dispatch({
            type: types.closeSession
        })

    }

    return (
        <authContext.Provider
            value={{
                state,
                registerUser,
                loginUser,
                getUserIsAuthenticated,
                closeSession,
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}
