import {applyMiddleware,createStore } from "redux"
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers"

const persistConfig = {
    key: 'theme-root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

export const store = createStore(
    persistedReducer, 
    process.env.REACT_APP_NODE_ENV === 'production' ?  applyMiddleware(thunkMiddleware) :composeEnhancers(applyMiddleware(thunkMiddleware)))
    
export const persistor = persistStore(store);

export default store;


