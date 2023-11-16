import { ACCESSOR_TYPES } from "@babel/types";
import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
  upimandate_list: [],
  upimandate_detail: {},
  upiMandate_Stats: {},
  upiMandate_transactions: {},
};

export const UpiMandate = (state = initialState, action) => {
  const actionTypes = [
    ActionTypes.GET_UPI_MANDATE_LIST,
    ActionTypes.GET_UPI_MANDATE_DETAIL,
    ActionTypes.GET_UPI_MANDATE_STATS,
    ActionTypes.GET_UPI_MANDATE_TRANSACTIONS
  ];
  if (actionTypes.includes(action.type)) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return state;
  }
};
