import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, errors }) => {
    const [showPaswword, setShowPaswword] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    function toggleShowPaswword() {
        setShowPaswword((prevState) => !prevState);
    }

    const getInputClasses = () => {
        return "form-control" + (errors ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    className={getInputClasses()}
                    type={showPaswword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPaswword}
                    >
                        {
                            <i
                                className={
                                    "bi bi-eye" + (showPaswword ? "-slash" : "")
                                }
                            ></i>
                        }
                    </button>
                )}
                {errors && <div className="invalid-feedback"> {errors} </div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.string
};

export default TextField;
