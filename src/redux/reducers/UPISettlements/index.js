import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
  UpiSettltmentList: [],
  UpisettlementDetail: []
};

export const UPISettlements = (state = initialState, action) => {
  const actionTypes = [
    ActionTypes.GET_UPISETTLEMENT_LIST,
    ActionTypes.GET_UPISETTLEMENT_DETAIL,
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