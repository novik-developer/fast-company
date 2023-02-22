import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";

const LoginForm = () => {
    // console.log(process.env);
    const { signIn } = useAuth();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Еmail обязателен к заполнению"
            },
            isEmail: {
                message: "Еmail введен не коректно"
            }
        },
        password: {
            isRequired: {
                message: "Password обязателен к заполнению"
            },
            isCapitelSymbol: {
                message:
                    "Password должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Password должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Password должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValide = validate();
        if (!isValide) return;
        console.log("event", data);

        try {
            await signIn(data);
            console.log("data Sign In", data);
        } catch (error) {
            setErrors(error);
        }
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
            <CheckBoxField
                value={data.stayOn}
                name="stayOn"
                onChange={handleChange}
            >
                Оставаться в системе
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

export default LoginForm;
