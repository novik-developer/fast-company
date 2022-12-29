export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitelSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitlRegExp = /\d+/g;
                statusValidate = !digitlRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.massage;
    }
    for (const fildName in data) {
        for (const validatorMethod in config[fildName]) {
            const error = validate(
                validatorMethod,
                data[fildName],
                config[fildName][validatorMethod]
            );
            if (error && !errors[fildName]) {
                errors[fildName] = error;
            }
        }
    }
    return errors;
}
