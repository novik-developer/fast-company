import React, { useState } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handlerChangeBookmark = (userId) => {
    const favotited = users.findIndex((user) => user._id === userId);
    const favoritedUsers = [...users];
    favoritedUsers[favotited].bookmark = !favoritedUsers[favotited].bookmark;
    setUsers(favoritedUsers);
  };
  return (
    <>
      {SearchStatus(users)}
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                {...user}
                key={user._id}
                onDelete={handleDelete}
                onChangeBookmark={handlerChangeBookmark}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
