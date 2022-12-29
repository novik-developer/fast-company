import React, { useEffect, useState } from "react";
import TextField from "../textField";
import { validator } from "../../utils/validator.js";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
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
                massage: "Password обязателен к заполнению"
            },
            isCapitelSymbol: {
                massage:
                    "Password должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                massage: "Password должен содержать хотя бы одну цифру"
            },
            min: {
                massage: "Password должен состоять минимум из 8 символов",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValide = validate();
        if (!isValide) return;
        console.log("event", data);
    };

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
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
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
