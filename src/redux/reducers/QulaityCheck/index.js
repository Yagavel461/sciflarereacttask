import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
    merchant: {},
    stores: [],
    bankList: [],
    vpaList: [],
    categories: [],
    subcategories: [],
    subuserlist:[],
    partnerlist:[]
};

export const QualityCheck = (state = initialState, action) => {
    let actiontypeValue = [
        ActionTypes.GET_QCCATEGORY_LIST,
        ActionTypes.GET_QCSUBCATEGORY_LIST,
        ActionTypes.GET_QCMERCHANT_DETAILS,
        ActionTypes.GET_QCSTORE_LIST,
        ActionTypes.GET_QCBANK_LIST,
        ActionTypes.GET_QCVPA_LIST,
        ActionTypes.GET_QCSUBUSER_LIST,
        ActionTypes.GET_QCPARTNER_LIST
    ]
    if (actiontypeValue.includes(action.type)) {
        return {
          ...state,
          ...action.payload,
        };
      } else {
        return state;
      }
}
