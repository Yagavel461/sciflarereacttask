import { ActionTypes } from "../../constants/actionTypes";
const initialState = {
ProfileInfo:{}
}

export const ProfileDetails = (state = initialState,action)=>{
    let actiontypeValue = [
        ActionTypes.GET_PROFILE_DETAILS,
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