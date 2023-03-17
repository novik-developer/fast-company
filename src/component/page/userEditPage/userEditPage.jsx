import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
    getQualitiesList,
    getQualitiesLoadingStatus
} from "./../../../store/qualities";
import { validator } from "../../../utils/validator";
import BackButton from "../../common/backButton";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectFild from "../../common/form/selectFild";
import TextField from "../../common/form/textField";
import {
    getProfessionsList,
    getProfessionsLoadingStatus
} from "../../../store/profession";
import { getCurrentUserData } from "../../../store/users";

const EditUserPage = () => {
    const history = useHistory();
    const { updateData } = useAuth();
    const currentUser = useSelector(getCurrentUserData());
    const professions = useSelector(getProfessionsList());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const qualities = useSelector(getQualitiesList());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState();

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id,
        color: q.color
    }));

    const getQualities = (qualId) => {
        const qualitiesArray = [];
        for (const elem of qualId) {
            for (const quality of qualities) {
                if (elem === quality._id) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateData({
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        });
        history.push(`/users/${currentUser._id}`);
    };
    const transformData = (data) => {
        return getQualities(data).map((qual) => ({
            label: qual.name,
            value: qual._id,
            color: qual.color
        }));
    };
    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Еmail обязателен к заполнению"
            },
            isEmail: {
                message: "Еmail введен не коректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    return (
        <>
            <div className="container mt-5 position-relative">
                <BackButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h4 className="mb-4">Редактирование пользователя</h4>
                        {!isLoading && Object.keys(professions).length > 0 ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    errors={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    errors={errors.email}
                                />
                                <SelectFild
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={professionsList}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    defaultValue={data.qualities}
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUserPage;
