import { types } from "../../types/types";

export const aletReducer = (state, action) => {

    switch (action.type) {
        case types.alertShow:
            return {
                ...state,
                alert: action.payload
            }

        case types.alertClose:
            return {
                ...state,
                alert: null
            }
        default:
            return state;
    }

}
