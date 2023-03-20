import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReseved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestedField: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReseved,
    commentsRequestedField,
    commentRemoved,
    commentCreated
} = actions;

const commentCreateRequested = createAction("users/commentCreateRequested");
const createCommentFailed = createAction("users/createCommentFailed");
const commetnRemoveRequested = createAction("users/commetnRemoveRequested");
const removeCommentFailed = createAction("users/removeCommentFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReseved(content));
    } catch (error) {
        dispatch(commentsRequestedField(error.message));
    }
};
// создание
export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(commentCreateRequested());
    try {
        const { content } = await commentService.createComment({
            ...payload,
            _id: nanoid(),
            created_at: Date.now(),
            userId: getCurrentUserId()(getState())
        });

        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(createCommentFailed(error.message));
    }
};
// удаление
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commetnRemoveRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        console.log("content", content);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(removeCommentFailed(error.message));
    }
};

export const getCommentsList = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
