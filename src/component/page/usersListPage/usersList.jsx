import React, { useState, useEffect } from "react";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../api";
import PropTypes from "prop-types";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import _ from "lodash";
import UserTable from "../../ui/usersTable";
import Search from "../../ui/serach";
import { useUser } from "../../../hooks/useUser";

const UsersList = () => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" }); // asc,desc

    // const [users, setUsers] = useState();

    const { users } = useUser();
    console.log("users", users);

    // searchInput
    const [searchValue, setSearchValue] = useState("");

    const filteredSearchUsers =
        users &&
        users.filter((item) => {
            return Object.values(item)
                .join("")
                .toLowerCase()
                .includes(searchValue.toLowerCase().trim());
        });

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        if (searchValue) {
            setSelectedProf(null);
        }
    }, [searchValue]);

    // searchInput

    // useEffect(() => {
    //     api.users.fetchAll().then((data) => setUsers(data));
    // }, []);
    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log("userId", userId);
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log("newArray", newArray);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePrfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchValue("");
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => _.isEqual(user.profession, selectedProf))
            : filteredSearchUsers;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        ); // asc,desc
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        if (userCrop.length === 0 && filteredUsers.length) {
            setCurrentPage((currentPage) => currentPage - 1);
        }

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemsSelect={handlePrfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column flex-grow-1">
                    <SearchStatus length={count} />
                    <Search {...{ searchValue, handleSearchChange }} />

                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            onSort={handleSort}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "...loading";
};
UsersList.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default UsersList;
