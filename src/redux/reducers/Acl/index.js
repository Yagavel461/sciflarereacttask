import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
    getALLRoutes: {},
    getWhitelistedRoutes: {}
};

export const Acl = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_OVERALL_ROUTESLIST:
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.GET_WHITELIST_ROUTES:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
