import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valuePropetry,
    contentProperty,
    onItemsSelect,
    selectedItem
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li
                    key={items[item][valuePropetry]}
                    className={
                        "list-group-item" +
                        (items[item] === selectedItem ? " active" : " ")
                    }
                    onClick={() => onItemsSelect(items[item])}
                    role="button"
                >
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    valuePropetry: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valuePropetry: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemsSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
