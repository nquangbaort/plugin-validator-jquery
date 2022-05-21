$(function() {
    $.fn.hello = function() {
        return this.each(function() {
            $(this).text("Hello, World!");
        });
    }
    $.fn.isFunction = function(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    $.fn.validator = function(callbackSuccess, callbackError) {
        return this.each(function() {
            $(this).keyup(function() {
                let _self = $(this);
                $.fn.validate(_self, function(input, result) {
                    if (!$.fn.isFunction(callbackSuccess)) return;
                    callbackSuccess(input, result);
                }, function(input, result) {
                    if (!$.fn.isFunction(callbackError)) return;
                    callbackError(input, result);
                })
            })
        });
    }
    $.fn.validate = function(input, callbackSuccess, callbackError) {
        let rules = $(input).attr("rules");
        if (!rules) return;
        rules = rules.split("|");
        let value = $(input).val();
        rules.map(function(rule) {
            let isRule = rule.split(":")
            let funcRule = window[isRule[0]];
            let parameters = isRule[1]
            if (parameters) {
                parameters = parameters.split(",");
                if (Array.isArray(parameters) && parameters.length > 0) {
                    if ($.fn.isFunction(funcRule)) {
                        let result = funcRule(value, parameters);
                        if (result !== true) {
                            if (!$.fn.isFunction(callbackError)) return;
                            return callbackError(input, result);
                        }
                        if (!$.fn.isFunction(callbackSuccess)) return;
                        return callbackSuccess(input, result);
                    }
                }
            }

            if ($.fn.isFunction(funcRule)) {
                let result = funcRule(value);
                if (result !== true) {
                    if (!$.fn.isFunction(callbackError)) return;
                    return callbackError(input, result);
                }
                if (!$.fn.isFunction(callbackSuccess)) return;
                return callbackSuccess(input, result);
            }
        })
    }
    $.fn.formValidator = function(callbackSuccess, callbackError, submit1) {
        return this.each(function() {
            $(this).submit(function(e) {
                let form = $(this);
                let isValid = false;
                form.find("input").each(function(i) {
                    let _self = $(this);
                    try {
                        $.fn.validate(_self, function(input, result) {
                            isValid = true;
                            if (!$.fn.isFunction(callbackSuccess)) return;
                            callbackSuccess(input, result);
                        }, function(input, result) {
                            isValid = false;
                            if (!$.fn.isFunction(callbackError)) return;
                            callbackError(input, result);
                        })
                    } catch (e) {
                        console.error(e);
                    }
                })

                return isValid;
            })
        })
    }
});