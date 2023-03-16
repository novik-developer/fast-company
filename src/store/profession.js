import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReseved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        professionsRequestedField: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReseved, professionsRequestedField } =
    actions;

export const loadProfessionsList = () => async (dispatch) => {
    dispatch(professionsRequested());
    try {
        const { content } = await professionService.get();
        dispatch(professionsReseved(content));
    } catch (error) {
        dispatch(professionsRequestedField(error.message));
    }
};

export const getProfessionsList = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export const getProfessionByids = (professionId) => (state) => {
    return state.professions.entities.find((p) => p._id === professionId);
};
export default professionsReducer;
