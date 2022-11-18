import React from "react";

const Bookmark = (props) => {
  return (
    <i
      className={`bi ${
        props.bookmark ? "bi-bookmark-heart-fill" : "bi-bookmark"
      } fs-5 m-4`}
      onClick={() => props.onChangeBookmark(props._id)}
    ></i>
  );
};
export default Bookmark;
