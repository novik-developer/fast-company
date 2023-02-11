import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import EditUserPage from "../component/page/userEditPage/userEditPage";
import UserPage from "../component/page/userPage";
import UsersList from "../component/page/usersListPage";
import UserProvider from "../hooks/useUser";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            <UserProvider>
                {edit ? (
                    <EditUserPage />
                ) : userId ? (
                    <UserPage userId={userId} />
                ) : (
                    <UsersList />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
