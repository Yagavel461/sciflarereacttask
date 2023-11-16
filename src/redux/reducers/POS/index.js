import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
PosCategory:[],
PosRequest:[],
PosRequestDetails:{},
PosCategoryDetails:{},
PosProductList:[],
PosProductDetails:{}
}

export const PosManagement = (state = initialState,action)=>{
    let actiontypeValue = [
        ActionTypes.GET_POS_CATEGORY_LIST,
        ActionTypes.GET_POS_REQUEST_LIST,
        ActionTypes.GET_POS_REQUEST_DETAILS,
        ActionTypes.GET_POS_CATEGORY_DETAILS,
        ActionTypes.GET_POS_PRODUCT_LIST,
        ActionTypes.GET_POS_PRODUCT_DETAILS,
    ]
    if(actiontypeValue.includes(action.type)){
        return {
            ...state,
            ...action.payload
        };
    }
    else{
        return state;
    }
}