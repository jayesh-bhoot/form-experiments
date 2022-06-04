import {button, div, fieldset, form, input, label, li, p, span, text, ul} from '@hyperapp/html';
import {Dispatchable, ElementVNode} from 'hyperapp';
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

export function nextSection (currentSection: Section): Section {
    switch (currentSection) {
        case 'Social':
            return 'Physiological';

        case 'Physiological':
            return 'Geographical';

        case 'Geographical':
            return 'Financial';

        case 'Financial':
            return 'Financial';
    }
}

export function previousSection (currentSection: Section): Section {
    switch (currentSection) {
        case 'Social':
            return 'Social';

        case 'Physiological':
            return 'Social';

        case 'Geographical':
            return 'Physiological';

        case 'Financial':
            return 'Geographical';
    }
}

function getErrorsUntilCurrentSection (section: Section, errors: FieldErrors): FieldErrors {
    switch (section) {
        case 'Social': {
            return {
                ...errors,
                age: '',
                height: '',
                pincode: '',
                city: '',
                company: '',
            };
        }

        case 'Physiological': {
            return {
                ...errors,
                pincode: '',
                city: '',
                company: '',
            };
        }

        case 'Geographical': {
            return {
                ...errors,
                company: '',
            };
        }

        case 'Financial': {
            return errors;
        }
    }
}

export function fillField (state: AppState, event: Event): AppState {
    if (event.target instanceof HTMLInputElement) {
        const fields: Fields = {
            ...state.form.fields,
            // todo: how to make this verify that FieldName and Fields.property must match?
            [event.target.name]: event.target.value,
        };
        if (state.form.state === 'Fixing') {
            const result = toPerson(fields);
            if (isOk(result)) {
                return {
                    ...state,
                    form: {
                        ...state.form,
                        state: 'Filling',
                        fields,
                        fieldErrors: initialState.form.fieldErrors,
                        formErrors: initialState.form.formErrors,
                    },
                };
            } else {
                const errors = getErrorsUntilCurrentSection(state.form.currentSection, result.error);
                const hasErrors = Object.entries(errors).some(([k, v]) => v && v.length > 0);
                return {
                    ...state,
                    form: {
                        ...state.form,
                        state: hasErrors ? 'Fixing' : 'Filling',
                        fields,
                        fieldErrors: errors,
                        formErrors: hasErrors ? ['Please fix all the errors below'] : [],
                    },
                };
            }
        }

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

export function continue_ (state: AppState, event: SubmitEvent): Dispatchable<AppState> {
    const result = toPerson(state.form.fields);
    if (isOk(result)) {
        return [
            {
                ...state,
                form: {
                    ...state.form,
                    state: 'Filling',
                    currentSection: nextSection(state.form.currentSection),
                    fieldErrors: initialState.form.fieldErrors,
                    formErrors: initialState.form.formErrors,
                },
            },
            () => event.preventDefault(),
        ];
    } else {
        const errors = getErrorsUntilCurrentSection(state.form.currentSection, result.error);
        const hasErrors = Object.entries(errors).some(([k, v]) => v && v.length > 0);
        return [
            {
                ...state,
                form: {
                    ...state.form,
                    state: hasErrors ? 'Fixing' : 'Filling',
                    currentSection: hasErrors ? state.form.currentSection : nextSection(state.form.currentSection),
                    fieldErrors: errors,
                    formErrors: hasErrors ? ['Please fix all the errors below'] : [],
                },
            },
            () => event.preventDefault(),
        ];
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
                    fieldErrors: getErrorsUntilCurrentSection(state.form.currentSection, result.error),
                    formErrors: ['Please fix all the errors below'],
                },
            },
            () => event.preventDefault(),
        ];
    }
}

function viewSocialSection (formState: Form): ElementVNode<AppState> {
    return fieldset({}, [
        div({'class': 'FillName'}, [
            label({'for': 'name', 'class': 'FillName-Label'}, [
                span({}, text('Name')),
                span({}, text(formState.fieldErrors.name)),
            ]),
            input({type: 'text', name: 'name', id: 'name', value: formState.fields.name, onchange: fillField}, []),
        ]),
        div({'class': 'FillEmail'}, [
            label({'for': 'email', 'class': 'FillEmail-Label'}, [
                span({}, text('Email')),
                span({}, text(formState.fieldErrors.email)),
            ]),
            input({
                type: 'text',
                name: 'email',
                id: 'email',
                value: formState.fields.email,
                onchange: fillField,
            }, []),
        ]),
    ]);
}

function viewPhysiologicalSection (formState: Form): ElementVNode<AppState> {
    return fieldset({}, [
        div({'class': 'FillAge'}, [
            label({'for': 'age', 'class': 'FillAge-Label'}, [
                span({}, text('Age')),
                span({}, text(formState.fieldErrors.age)),
            ]),
            input({type: 'text', name: 'age', id: 'age', value: formState.fields.age, onchange: fillField}, []),
        ]),
        div({'class': 'FillHeight'}, [
            label({'for': 'height', 'class': 'FillHeight-Label'}, [
                span({}, text('Height in cms')),
                span({}, text(formState.fieldErrors.height)),
            ]),
            input({
                type: 'text',
                name: 'height',
                id: 'height',
                value: formState.fields.height,
                onchange: fillField,
            }, []),
        ]),
    ]);
}


function viewSection (formState: Form): ElementVNode<AppState> {
    switch (formState.currentSection) {
        case 'Social':
            return viewSocialSection(formState);

        case 'Physiological':
            return viewPhysiologicalSection(formState);

        case 'Geographical':
            return p({}, [text('Address')]);

        case 'Financial':
            return p({}, [text('Company')]);
    }
}

function viewSummary (formState: Form): ElementVNode<AppState> {
    return div({}, [
        p({}, [text(`Name: ${formState.fields.name}`)]),
        p({}, [text(`Email: ${formState.fields.email}`)]),
        p({}, [text(`Age: ${formState.fields.age}`)]),
        p({}, [text(`Age: ${formState.fields.height}`)]),
    ]);
}

export function viewForm (formState: Form): ElementVNode<AppState> {
    return form({onsubmit: continue_}, [
        ul({}, formState.formErrors.map(error => li({}, text(error)))),
        viewSection(formState),
        button({type: 'submit'}, [text('Continue')]),
    ]);
}
