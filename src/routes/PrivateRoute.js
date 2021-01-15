import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authContext } from '../context/auth/authContext'

export const PrivateRoute = ({ authenticated, component: Component, ...rest }) => {

    const { state: { user} , getUserIsAuthenticated} = useContext(authContext)


    useEffect(() => {
        if (!user) {
            getUserIsAuthenticated()
        }
    // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Route {...rest}
                component={(props) => (
                    (authenticated )
                        ? <Component {...props} />
                        : <Redirect to="/" />
                )}
            />
        </div>
    )
}
