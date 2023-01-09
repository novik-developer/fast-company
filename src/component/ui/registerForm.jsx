import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelecteFild from "../common/form/selectFild";
import RadioField from "../common/form/radioField";
import MiltiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    // const [qualities, setQualities] = useState({});
    const [qualities, setQualities] = useState([]);
    // const [professions, setProfession] = useState();
    const [professions, setProfession] = useState([]);
    // useEffect(() => {
    //     api.professions.fetchAll().then((data) => setProfession(data));
    //     api.qualities.fetchAll().then((data) => setQualities(data));
    // }, []);
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                massage: "Еmail обязателен к заполнению"
            },
            isEmail: {
                massage: "Еmail введен не коректно"
            }
        },
        password: {
            isRequired: {
                massage: "Пароль обязателен к заполнению"
            },
            isCapitelSymbol: {
                massage: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                massage: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                massage: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                massage: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                massage:
                    "Вы не можете воспользоваться нашим сервисом без подтверждения лицензионного соглашения"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const isValide = validate();
    //     if (!isValide) return;
    //     console.log("event", data);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                errors={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                errors={errors.password}
            />
            <SelecteFild
                onChange={handleChange}
                options={professions}
                name="profession"
                defaultOption="Choose..."
                value={data.profession}
                error={errors.profession}
                label="Выберите вашу профессию"
            />
            <RadioField
                onChange={handleChange}
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                name="sex"
                value={data.sex}
                label="Выберите ваш пол"
            />
            <MiltiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
            />
            <CheckBoxField
                value={data.licence}
                name="licence"
                onChange={handleChange}
                error={errors.licence}
            >
                Подтвердите <a>лицензионное</a> соглашение
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                submit
            </button>
        </form>
    );
};

export default RegisterForm;
