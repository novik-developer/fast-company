import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => {
  return (
    <tr key={props._id}>
      <td>{props.name}</td>
      <td>
        {props.qualities.map((item) => (
          <Qualitie {...item} key={item._id}></Qualitie>
        ))}
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate}</td>
      <td>
        <Bookmark onChangeBookmark={props.onChangeBookmark} {...props} />
      </td>
      <td>
        <button
          onClick={() => props.onDelete(props._id)}
          className="btn btn-danger"
        >
          удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
