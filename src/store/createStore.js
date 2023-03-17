import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReducer from "./profession";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer
});

export function createStore(params) {
    return configureStore({ reducer: rootReducer });
}
