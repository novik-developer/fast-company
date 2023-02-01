import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import CommentList from "../common/comments/commentList";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    const handleRemove = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id));
        });
        console.log(comments);
    };
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
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
