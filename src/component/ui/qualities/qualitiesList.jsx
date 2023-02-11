import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    // console.log("qual", qualities);
    const { isLoading } = useQualities();
    if (isLoading) return "..loading";
    return (
        <>
            {qualities.map((qual) => (
                <Qualitie key={qual} id={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
