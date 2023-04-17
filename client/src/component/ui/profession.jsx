import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import {
    getProfessionByids,
    getProfessionsLoadingStatus
} from "../../store/profession";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());

    const prof = useSelector(getProfessionByids(id));

    if (!isLoading) {
        return <p> {prof.name}</p>;
    } else return "...loading";
};

Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
