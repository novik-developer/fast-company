import React from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import EditUserPage from "../component/page/userEditPage/userEditPage";
import UserPage from "../component/page/userPage";
import UsersList from "../component/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUser";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const { currentUser } = useAuth();

    return (
        <>
            <UserProvider>
                {edit ? (
                    userId === currentUser._id ? (
                        <EditUserPage />
                    ) : (
                        <Redirect to={`/users/${currentUser._id}/edit`} />
                    )
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
