import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
  dispute_list: [],
  dispute_detail: [],
};

export const Disputes = (state = initialState, action) => {
  const actionTypes = [
    ActionTypes.GET_DISPUTE_LIST,
    ActionTypes.GET_DISPUTE_DETAIL,
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
