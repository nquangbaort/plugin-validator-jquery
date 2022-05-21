function required(value) {
    return value.length > 0 || 'This field is required';
}

function email(value) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (Array.isArray(value)) {
        return value.every(val => re.test(String(val)))
    }
    return re.test(String(value)) || 'hãy nhập đúng email'
}

function password(value) {
    const regExp = /(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}[]|:;"'<>,_₹]){8}/
    const regExp2 = /(?=.*\d)(?=.*[a-z]){8}/
    const regExp3 = /(?=.*\d)(?=.*[~`!@#$%^&*()--+={}[]|:;"'<>,_₹]){8}/
    const validPassword = regExp.test(value)
    const validPassword2 = regExp2.test(value)
    const validPassword3 = regExp3.test(value)

    return (validPassword || validPassword2 || validPassword3) || 'Mật khẩu cần 8 kí tự gồm chữ thường và số hoặc kí tự đặc biệt'
}

function number(value) {
    if (Array.isArray(value)) {
        return value.every(val => /^-?[0-9]+$/.test(String(val)))
    }
    return /^-?[0-9]+$/.test(String(value)) || 'hãy nhập số'
}

function between(value, parameters) {
    // console.log(parameters);
    if (!parameters) return;
    let min = Number(parameters[0]);
    let max = Number(parameters[1]);
    const valueAsNumber = Number(value);
    return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || 'hãy nhập số từ' + min + ' đến ' + max
}