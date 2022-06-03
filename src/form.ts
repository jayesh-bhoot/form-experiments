import {Dispatchable} from 'hyperapp';
import {AppState, initialState} from './app';
import {toPerson} from './person';
import {isOk} from './result';

export type FormState =
    | 'Filling'
    | 'Fixing'
    | 'Submitting'
    | 'Submitted'

export type Section =
    | 'Social'
    | 'Physiological'
    | 'Geographical'
    | 'Financial';

export type FieldName =
    | 'name'
    | 'email'
    | 'age'
    | 'height'
    | 'pincode'
    | 'city'
    | 'company'

export type Fields = {
    name: string,
    email: string,
    age: string,
    height: string,
    pincode: string,
    city: string,
    company: string
}

type FieldFilled = {
    name: FieldName,
    value: string,
}

export type FieldErrors = {
    name: string,
    email: string,
    age: string,
    height: string,
    pincode: string,
    city: string,
    company: string,
}

export type Form = {
    state: FormState,
    fields: Fields,
    fieldErrors: FieldErrors,
    formErrors: string[],
    currentSection: Section,
}

export function firstSection (): Section {
    return 'Social';
}

export function nextSection (currentSection: Section): Section | undefined {
    switch (currentSection) {
        case 'Social':
            return 'Physiological';

        case 'Physiological':
            return 'Geographical';

        case 'Geographical':
            return 'Financial';

        case 'Financial':
            return undefined;
    }
}

export function previousSection (currentSection: Section): Section | undefined {
    switch (currentSection) {
        case 'Social':
            return undefined;

        case 'Physiological':
            return 'Social';

        case 'Geographical':
            return 'Physiological';

        case 'Financial':
            return 'Geographical';
    }
}

export function fillField (state: AppState, event: Event): AppState {
    if (event.target instanceof HTMLInputElement) {
        return {
            ...state,
            form: {
                ...state.form,
                fields: {
                    ...state.form.fields,
                    // todo: how to make this verify that FieldName and Fields.property must match?
                    [event.target.name]: event.target.value,
                },
            },
        };
    } else {
        return state;
    }
}

export function submit (state: AppState, event: SubmitEvent): Dispatchable<AppState> {
    const result = toPerson(state.form.fields);
    if (isOk(result)) {
        return [
            {
                ...state,
                form: {
                    ...state.form,
                    state: 'Submitted',
                    fieldErrors: initialState.form.fieldErrors,
                    formErrors: initialState.form.formErrors,
                },
            },
            () => event.preventDefault(),
        ];
    } else {
        return [
            {
                ...state,
                form: {
                    ...state.form,
                    state: 'Fixing',
                    fieldErrors: result.error,
                    formErrors: ['Please fix all the errors below'],
                },
            },
            () => event.preventDefault(),
        ];
    }
}
