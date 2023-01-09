import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import UserPage from "../component/page/userPage";
import UsersList from "../component/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

export default Users;
