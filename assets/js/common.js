function validateError(input, result) {
    $(input).addClass("is-invalid");
    $(input).next().text(result);
}

function validateSuccess(input, result) {
    $(input).removeClass("is-invalid");
    $(input).next().text('');
}