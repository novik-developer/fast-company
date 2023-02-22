import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setToken } from "../services/localStorage.service";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            console.log("data Sign Up", data);
            setToken(data);
            await createUser({ id: data.localId, email, ...rest });
            console.log("data", data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setToken(data);
            await getUser(data.localId);
            console.log("data SignIn:", data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                let errorObject = { email: message, password: message };
                if (message === "EMAIL_NOT_FOUND") {
                    errorObject = {
                        email: "ЭЛЕКТРОННАЯ ПОЧТА НЕ НАЙДЕНА"
                    };
                }
                if (message === "INVALID_PASSWORD") {
                    errorObject = {
                        password: "Неверный пароль"
                    };
                }
                throw errorObject;
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getUser(data) {
        try {
            const { content } = userService.getById(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <AuthContext.Provider value={{ signUp, currentUser, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AuthProvider;
