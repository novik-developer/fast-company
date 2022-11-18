import React from "react";
const Qualitie = (props) => {
  return (
    <span className={"badge m-1 bg-" + props.color} key={props._id}>
      {props.name}
    </span>
  );
};
export default Qualitie;
