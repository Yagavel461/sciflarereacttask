import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
  SoundBoxList: [],
  soundbox_details: [],
  SoundBoxPlanList: [],
};

export const SoundBox = (state = initialState, action) => {
  const actionTypes = [
    ActionTypes.GET_SOUNDBOX_LIST,
    ActionTypes.GET_SOUNDBOXDETAILS,
    ActionTypes.GET_SOUNDBOXPLAN_LIST
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
