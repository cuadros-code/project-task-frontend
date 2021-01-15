import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { ProjectsScreen } from '../components/projects/ProjectsScreen';
import { authContext } from '../context/auth/authContext';
import { PrivateRoute } from './PrivateRoute';



export const AppRouter = () => {

    const { state: { authenticated } } = useContext(authContext)


    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginScreen} />
                <Route exact path="/register" component={RegisterScreen} />
                <PrivateRoute
                    exact
                    path="/projects"
                    component={ProjectsScreen}
                    authenticated={authenticated}
                />
                {/* <Route exact path="/projects" component={ProjectsScreen} /> */}
            </Switch>
        </Router>

    )
}
