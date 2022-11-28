/**
 * use this function for input validation
 */

function validator(validate, value){

    if(!validate) return  ""

    if ("required" in validate) {
        if (!value || value === "") return validate["required"];
    }

    if ("number" in validate) {
        if (isNaN(Number(value))) return validate["number"];
    }

    if ("minLength" in validate) {
        if (value && typeof value === "string" && value.length < validate.minLength.value) return validate["minLength"].message;
    }

    if ("maxLength" in validate) {
        if (value && typeof value === "string" && value.length > validate.maxLength.value) return validate["maxLength"].message;
    }

    if ("length" in validate) {
        if (value && typeof value === "string" && value.length !== validate.length.value) return validate["length"].message;
    }

    if ("maxFileSize" in validate) {
        // validate for blob file
        if ("maxFileSize" in validate) {
            if (typeof value === "object" && value && value.size > (validate?.maxFileSize?.value * 1024)) {
                return validate["maxFileSize"].message + " " + `. This file is ${Math.ceil(Number(value.size) / 1024)}Kb`;
            }
        }
    }

    if ("min" in validate) {
        if (value && value < validate.min.value) return validate["min"].message;
    }
    if ("max" in validate) {
        if (value && value > validate.max.value) return validate["max"].message;
    }
    return  ""
}

export default validator;
