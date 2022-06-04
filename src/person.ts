import {FieldErrors, Fields} from './form';
import {error, isOk, ok, Result} from './result';

export type Person = {
    name: string,
    email: string,
    age: number,
    height: number,
    pincode: string,
    city: string,
    company: string
}

function toName (input: string): Result<string, string> {
    if (input && input.trim().length >= 0) {
        return ok(input.trim());
    } else {
        return error('Please fill your name');
    }
}

function toEmail (input: string): Result<string, string> {
    if (input && input.trim().length >= 0) {
        return ok(input.trim());
    } else {
        return error('Please fill your email');
    }
}

function toAge (input: string): Result<number, string> {
    if (!(input && input.trim().length >= 0)) {
        return error('Please fill your age');
    }
    const age = Number(input.trim());
    if (!Number.isFinite(age)) {
        return error('Please enter a number as your age');
    }

    if (!(age >= 18 && age <= 150)) {
        return error('You are not an adult');
    }
    return ok(age);
}

function toHeight (input: string): Result<number, string> {
    if (!(input && input.trim().length >= 0)) {
        return error('Please fill your height in cms');
    }

    const height = Number(input.trim());
    if (!Number.isFinite(height)) {
        return error('Please enter a number as your height in cms');
    }

    if (!(height >= 40 && height <= 300)) {
        return error('You are not a human');
    }

    return ok(height);
}

function toPincode (input: string): Result<string, string> {
    if (input && input.trim().length >= 0) {
        return ok(input.trim());
    } else {
        return error('Please fill your pincode');
    }
}

function toCity (input: string): Result<string, string> {
    if (input && input.trim().length >= 0) {
        return ok(input.trim());
    } else {
        return error('Please fill your city');
    }
}

function toCompany (input: string): Result<string, string> {
    if (input && input.trim().length >= 0) {
        return ok(input.trim());
    } else {
        return error('Please fill your company');
    }
}

export function toPerson (fields: Fields): Result<Person, FieldErrors> {
    const name = toName(fields.name);
    const email = toEmail(fields.email);
    const age = toAge(fields.age);
    const height = toHeight(fields.height);
    const pincode = toPincode(fields.pincode);
    const city = toCity(fields.city);
    const company = toCompany(fields.company);

    if (isOk(name) && isOk(email) && isOk(age) && isOk(height) && isOk(pincode) && isOk(city) && isOk(company)) {
        return ok({
            name: name.value,
            email: email.value,
            age: age.value,
            height: height.value,
            pincode: pincode.value,
            city: city.value,
            company: company.value,
        });
    } else {
        return error({
            name: isOk(name) ? '' : name.error,
            email: isOk(email) ? '' : email.error,
            age: isOk(age) ? '' : age.error,
            height: isOk(height) ? '' : height.error,
            pincode: isOk(pincode) ? '' : pincode.error,
            city: isOk(city) ? '' : city.error,
            company: isOk(company) ? '' : company.error,
        });
    }
}
