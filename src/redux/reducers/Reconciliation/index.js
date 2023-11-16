import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
    UPITransactions: [],
    UPITransactionDetail: {},

};

export const Reconciliation = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_UPITRANSACTION_LIST:
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.GET_UPITRANSACTION_DETAILS:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}
