import {FormValue} from "./form";

interface FormRule {
    key: string,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    pattern?: RegExp,
}

type FormRules = Array<FormRule>

interface FormErrors {
    [key: string]: string[]
}

function isEmpty(value: any) {
    return value === undefined || value === null || value === "";
}

export function noErroes(errors: any) {
    return Object.keys(errors).length === 0;
}

const Validator = (formValue: FormValue, rules: FormRules): FormErrors => {
    let errors: any = {};
    const addErrors = (key: string, message: string) => {
        if (errors[key] === undefined) {
            errors[key] = [];
        }
        errors[key].push(message);
    };
    rules.map(rule => {
        const value = formValue[rule.key];
        if (rule.required && isEmpty(value)) {
            addErrors(rule.key, "必填");
        }
        if (rule.minLength && !isEmpty(value) && value!.length < rule.minLength) {
            addErrors(rule.key, "太短");
        }
        if (rule.maxLength && !isEmpty(value) && value!.length > rule.maxLength) {
            addErrors(rule.key, "太长");
        }
        if (rule.pattern) {
            if (!(rule.pattern.test(value))) {
                addErrors(rule.key, "格式不正确")
            }
        }
    });
    return errors;
};

export default Validator;