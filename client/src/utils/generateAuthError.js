export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email или пароль введены не корректно";
        case "EMAIL_NOT_FOUND":
            return "Email или пароль введены не корректно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует";

        default:
            return "Слишком много попыток входа";
    }
}
