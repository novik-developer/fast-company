import React, { useState, useEffect } from "react";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import _ from "lodash";
import UserTable from "../../ui/usersTable";
import Search from "../../ui/serach";
import { useUser } from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";
import {
    getProfessionsList,
    getProfessionsLoadingStatus
} from "../../../store/profession";
import { useSelector } from "react-redux";

const UsersList = () => {
    const pageSize = 4;
    const professions = useSelector(getProfessionsList());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const { currentUser } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" }); // asc,desc

    const { users } = useUser();

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

    function filterUsers(data) {
        const filteredUsers = selectedProf
            ? data.filter((user) => _.isEqual(user.profession, selectedProf))
            : filteredSearchUsers;
        return filteredUsers.filter((u) => u._id !== currentUser._id);
    }

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]); // asc,desc
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    if (userCrop.length === 0 && filteredUsers.length) {
        setCurrentPage((currentPage) => currentPage - 1);
    }

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
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
};

UsersList.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default UsersList;
