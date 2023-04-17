import React from "react";
import PropTypes from "prop-types";
import Comment from "../comments/comment";

const CommentList = ({ comments, onRemove }) => {
    return comments.map((comment) => (
        <Comment key={comment._id} {...comment} onRemove={onRemove} />
    ));
};

CommentList.propTypes = {
    comment: PropTypes.array,
    onRemove: PropTypes.func
};
export default CommentList;
