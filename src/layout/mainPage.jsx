import React from "react";
import useMockData from "../utils/mockData";

const MainPage = () => {
    const { error, initialize, progress, status } = useMockData();

    const handleClick = () => {
        console.log("cliked");
        initialize();
    };
    return (
        <div className="container mt-5">
            {" "}
            <h1>MainPage</h1>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>status: {status}</li>
                <li>progress: {progress} %</li>
                {error && <li>error : {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </div>
    );
};

export default MainPage;
