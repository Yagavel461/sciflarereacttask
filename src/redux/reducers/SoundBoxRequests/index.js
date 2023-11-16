import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
  soundbox_request_list: {},
  soundbox_request_details: [],
  soundbox_mandate_stats:[]
};

export const SoundBoxRequests = (state = initialState, action) => {
  const actionTypes = [
    ActionTypes.GET_SOUNDBOX_REQUESTS_LIST,
    ActionTypes.GET_SOUNDBOX_REQUESTS_DETAILS,
    ActionTypes.GET_SOUNDBOX_MANDATE_STATS
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
