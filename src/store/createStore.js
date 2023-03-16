import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReducer from "./profession";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer
});

export function createStore(params) {
    return configureStore({ reducer: rootReducer });
}
