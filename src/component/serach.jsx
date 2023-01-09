import React from "react";
import PropTypes from "prop-types";

const Search = ({ searchValue, handleSearchChange }) => {
    return (
        <div className="me-2">
            <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
            />
        </div>
    );
};

Search.propTypes = {
    searchValue: PropTypes.string,
    handleSearchChange: PropTypes.func.isRequired
};
export default Search;
