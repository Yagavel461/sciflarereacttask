import {ActionTypes} from "../../constants/actionTypes"
import {layoutModeTypes, topBarThemeTypes, leftSideBarThemeTypes } from "../../constants/layouts";
const initialState = {
    layoutModeType: layoutModeTypes.LIGHT,
    leftSideBarTheme: leftSideBarThemeTypes.DARK,
    topbarTheme: topBarThemeTypes.DARK,
};
const showRightSidebarState = {
    showRightSidebar: false
};
export const layout = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LAYOUT_OPTIONS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export const showRight = (state = showRightSidebarState, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_RIGHT_SIDEBAR:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
