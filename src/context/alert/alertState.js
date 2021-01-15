import { useReducer } from "react"
import { types } from "../../types/types"
import { alertContext } from "./alertContext"
import { aletReducer } from "./alertReducer"

export const AlertState = props => {

    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(aletReducer, initialState)

    const showAlert = (msg, categorie) => {
     
        dispatch({
            type : types.alertShow,
            payload : {
                msg,
                categorie
            }
        })

        setTimeout(() => {
            dispatch({
                type: types.alertClose
            })
        }, 3000);
        
    }

    const closeAlert = () => {
        dispatch({
            type: types.alertClose
        })
    }

    return (
        <alertContext.Provider
            value={{
                state,
                showAlert,
                closeAlert
                
            }}
        >
            {props.children}
        </alertContext.Provider>
    )

}