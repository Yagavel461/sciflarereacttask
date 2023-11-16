import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
  settltmentList: [],
  settlementDetail: []
};

export const Settlements = (state = initialState, action) => {
  const actionTypes = [
    ActionTypes.GET_SETTLEMENT_LIST,
    ActionTypes.GET_SETTLEMENT_DETAIL,
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
