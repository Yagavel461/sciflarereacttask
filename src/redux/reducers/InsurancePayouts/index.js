import { ActionTypes } from '../../constants/actionTypes';
const initialState = {
  PayoutList: [],
};

export const insurancePayout = (state = initialState, action) => {
  let actiontypeValue = [ActionTypes.GET_PAYOUT_LIST];
  if (actiontypeValue.includes(action.type)) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return state;
  }
};
