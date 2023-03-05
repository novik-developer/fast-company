import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { validator } from "../../../utils/validator";
import BackButton from "../../common/backButton";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectFild from "../../common/form/selectFild";
import TextField from "../../common/form/textField";

const EditUserPage = () => {
    const { userId } = useParams();
    const { currentUser, updateData } = useAuth();
    const history = useHistory();
    const { professions, isLoading: professionLoading } = useProfessions();
    const { qualities, isLoading: qualitiesLoading } = useQualities();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState();

    // console.log("professions_1", professions);
    // console.log("qualities_1", qualities);
    // console.log("currentUser", currentUser);

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id,
        color: q.color
    }));

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]);
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        updateData({
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        });
        history.push(`/users/${userId}`);

        // console.log("DATA: ", data);
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
