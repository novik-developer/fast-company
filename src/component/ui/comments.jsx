import React, { useEffect } from "react";
import CommentList from "../common/comments/commentList";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getCommentsList,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const comments = useSelector(getCommentsList());
    const isLoading = useSelector(getCommentsLoadingStatus());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const handleRemove = (commentId) => {
        dispatch(removeComment(commentId));
    };
    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, pageId: userId }));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading ? (
                        <CommentList
                            onRemove={handleRemove}
                            comments={sortedComments}
                        />
                    ) : (
                        "...LOADING"
                    )}
                </div>
            </div>
        </>
    );
};

export default Comments;
