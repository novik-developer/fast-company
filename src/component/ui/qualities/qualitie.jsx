import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    console.log("_id ", id);
    const { getQuality } = useQualities();
    const { _id, color, name } = getQuality(id);

    return (
        <span key={_id} className={"badge m-1 bg-" + color}>
            {name}{" "}
        </span>
    );
};
Qualitie.propTypes = {
    id: PropTypes.string.isRequired
};
export default Qualitie;
