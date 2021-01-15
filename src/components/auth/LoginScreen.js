import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { alertContext } from '../../context/alert/alertContext';
import { authContext } from '../../context/auth/authContext';

export const LoginScreen = () => {

    const {  state: { authenticated, msg }, loginUser } = useContext(authContext)
    const { state: { alert }, showAlert, closeAlert} = useContext(alertContext)

    const history = useHistory()

    const [valueForm, setValueForm] = useState({
        email: '',
        password: ''
    })
    const { email, password } = valueForm; 

    useEffect(() => {
        
        if (authenticated) history.push('/projects')
        if (msg) showAlert(msg.msg, msg.categorie)
        // eslint-disable-next-line
    }, [msg, authenticated, history])


    useEffect(() => {
        closeAlert()
        // eslint-disable-next-line
    }, [history.location])

    const handleOnChange = (e) => {
        setValueForm({
            ...valueForm,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === '' ||
            password.trim() === '') {
            return showAlert('All inputs is required', 'alerta-error')
        }

        loginUser({ email, password })

    };

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
            {
                    alert
                    &&
                    (
                        <div className={`alerta ${alert.categorie}`}>{alert.msg}</div>
                    )

                }
                <h1>Login</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            onChange={handleOnChange}
                            value={email}
                            autoComplete="off"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your Password"
                            onChange={handleOnChange}
                            value={password}
                            autoComplete="off"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-btn btn-primario btn-block btn-submit"
                    >
                        Login
                    </button>

                </form>
                <Link
                    to="/register"
                    className="enlace-cuenta"
                >Create New Account</Link>
            </div>
        </div>
    )
}
