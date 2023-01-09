import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleAllUsers = () => {
        history.push("/users");
    };
    if (!user) {
        return <h1>...Loading</h1>;
    }
    return (
        <>
            <h1>{`Имя: ${user.name}`}</h1>
            <h3>{`Профессия: ${user.profession.name}`}</h3>
            <QualitiesList qualities={user.qualities} />
            <h4>{user.completedMeetings}</h4>
            <h5>{`Оценка: ${user.rate}`}</h5>
            <button className="btn btn-primary" onClick={handleAllUsers}>
                Все пользователи
            </button>
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
