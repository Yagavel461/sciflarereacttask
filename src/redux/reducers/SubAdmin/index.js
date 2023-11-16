import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
    subadmins: [],
    Subadmin: {},
};

export const SubAdmin = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_SUBADMIN_LIST:
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.GET_SUBADMIN_DETAILS:
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.ADD_NEW_SUBADMIN:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
