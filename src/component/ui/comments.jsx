import React from "react";
// import api from "../../api";
import CommentList from "../common/comments/commentList";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { createComment, comments, removeComments } = useComments();

    const handleRemove = (id) => {
        removeComments(id);
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });s
    };
    const handleSubmit = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
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
                    <CommentList
                        onRemove={handleRemove}
                        comments={sortedComments}
                    />
                </div>
            </div>
        </>
    );
};

export default Comments;
