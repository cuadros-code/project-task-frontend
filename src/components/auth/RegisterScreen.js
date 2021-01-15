import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { alertContext } from '../../context/alert/alertContext';
import { authContext } from '../../context/auth/authContext';

export const RegisterScreen = () => {


    const { state: { alert }, showAlert, closeAlert } = useContext(alertContext)
    const { state: { authenticated, msg }, registerUser } = useContext(authContext)

    const history = useHistory()

    const [valueForm, setValueForm] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    const { name, email, password, password2 } = valueForm;

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

        if (name.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            password2.trim() === '') {
            return showAlert('All inputs is required', 'alerta-error')
        }

        if (password.trim().length < 6 || password2.trim().length < 6) {
            return showAlert('The password must be at least 6 characters', 'alerta-error')
        }

        if (password.trim() !== password2.trim()) {
            return showAlert('passwords must be the same', 'alerta-error')
        }

        registerUser({ name, email, password })
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
                <h1>Create Account</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            onChange={handleOnChange}
                            value={name}
                            autoComplete="off"
                        />
                    </div>

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
                    <div className="campo-form">
                        <label htmlFor="password2">Confirm Password</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            placeholder="Confirm Password"
                            onChange={handleOnChange}
                            value={password2}
                            autoComplete="off"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-btn btn-primario btn-block btn-submit"
                    >
                        Create
                </button>

                </form>
                <Link
                    to="/"
                    className="enlace-cuenta"
                >
                    Login
            </Link>
            </div>
        </div>
    )
}
