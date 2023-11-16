import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
    Transactions: [],
    TransactionDetail: {},
};

export const Payments = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_TRANSACTION_LIST:
            return {
                ...state,
                ...action.payload,
            }

                case ActionTypes.REMOVE_TRANSACTION_LIST:
                    return {
                        TransactionList:[]
                    }


                case ActionTypes.GET_TRANSACTION_DETAILS:
                return {
                    ...state,
                    ...action.payload,
                }

        default:
            return state
    }
}
