import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import UsersList from "../usersList";
import UserPage from "../userPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

export default Users;
