import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BackButton = () => {
    const history = useHistory();
    console.log("history", history);
    return (
        <button
            onClick={() => history.goBack()}
            className="btn btn-primary  position-absolute top-0 start-0"
        >
            <i className="bi bi-caret-left"></i>
            Назад
        </button>
    );
};

export default BackButton;
