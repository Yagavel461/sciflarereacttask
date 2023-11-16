import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
  asm_list: [],
  tl_list: [],
  city_list: [],
  state_list: [],
  agentList: [],
  agent_details: {},
  third_party: [],
  get_agents:[]
};

export const Agents = (state = initialState, action) => {
  const actionTypes = [
    ActionTypes.GET_ASM_LIST,
    ActionTypes.GET_TL_LIST,
    ActionTypes.ADD_NEW_AGENT,
    ActionTypes.GET_AGENTCITY_LIST,
    ActionTypes.GET_AGENTSTATE_LIST,
    ActionTypes.GET_AGENT_LIST,
    ActionTypes.GET_AGENT_DETAIL,
    ActionTypes.GET_THIRDPARTY_LIST,
    ActionTypes.GET_AGENTS
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
