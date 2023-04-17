import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import EditUserPage from "../component/page/userEditPage/userEditPage";
import UserPage from "../component/page/userPage";
import UsersList from "../component/page/usersListPage";
import UsersLoader from "../component/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {edit ? (
                    userId === currentUserId ? (
                        <EditUserPage />
                    ) : (
                        <Redirect to={`/users/${currentUserId}/edit`} />
                    )
                ) : userId ? (
                    <UserPage userId={userId} />
                ) : (
                    <UsersList />
                )}
            </UsersLoader>
        </>
    );
};

export default Users;
