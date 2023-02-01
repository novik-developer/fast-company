import React, { useEffect, useState } from "react";
import API from "../../../api";
import { validator } from "../../../utils/validator";
import SelecteFild from "../form/selectFild";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";

const initialData = { userId: "", content: "" };
const AddCommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState({});
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Еmail обязателен к заполнению"
            }
        },
        content: {
            isRequired: {
                message: "Еmail обязателен к заполнению"
            }
        }
    };

    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
        console.log(data);
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));

    // useEffect(() => {
    //     validate();
    // }, [data]);
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelecteFild
                    options={arrayOfUsers}
                    onChange={handleChange}
                    value={data.userId}
                    name="userId"
                    defaultOption={"Выберите пользователя"}
                    error={errors.userId}
                />

                <TextAreaField
                    onChange={handleChange}
                    value={data.content}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddCommentForm;
