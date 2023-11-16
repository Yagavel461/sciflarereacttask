import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
  SurveyList: [],
  SurveyDetails: []
};

export const Surveys = (state = initialState, action) => {
  const actionTypes = [
    ActionTypes.GET_SURVEY_LIST,
    ActionTypes.GET_SURVEYDETAILS
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
