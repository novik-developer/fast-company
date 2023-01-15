import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import EditUserPage from "../component/page/userEditPage/userEditPage";
import UserPage from "../component/page/userPage";
import UsersList from "../component/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {edit ? (
                <EditUserPage />
            ) : userId ? (
                <UserPage userId={userId} />
            ) : (
                <UsersList />
            )}
        </>
    );
};

export default Users;
