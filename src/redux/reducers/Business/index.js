import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
  merchants: [],
  merchant: {},
  stores: [],
  store: {},
  submerchants: [],
  bankList: [],
  vpaList: [],
  categories: [],
  subcategories: [],
  subuserlist: [],
  subuser_details:{},
  soundBoxList: [],
  soundbox_details: [],
};

export const Business = (state = initialState, action) => {
    let actiontypeValue = [
        ActionTypes.GET_MERCHANT_LIST,
        ActionTypes.GET_MERCHANT_DETAILS,
        ActionTypes.ADD_NEW_MERCHANT,
        ActionTypes.GET_STORE_LIST,
        ActionTypes.GET_STORE_DETAILS,
        ActionTypes.GET_BANK_LIST,
        ActionTypes.GET_VPA_LIST,
        ActionTypes.GET_SUBMERCHANT_LIST,
        ActionTypes.GET_CATEGORY_LIST,
        ActionTypes.GET_SUBCATEGORY_LIST,
        ActionTypes.GET_SUBUSER_LIST,
        ActionTypes.GET_SUBUSER_DETAILS
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
