import {div, form, input, label, p, text} from '@hyperapp/html';
import {app, ElementVNode} from 'hyperapp';

type Result<T, E> =
    | { state: 'Ok', value: T }
    | { state: 'Error', error: E }

type FormState =
    | 'Filling'
    | 'Fixing'
    | 'Submitting'
    | 'Submitted'
type Fields = {
    name: string,
    email: string,
    age: string,
    height: string,
    pincode: string,
    city: string,
    company: string
}
type FieldErrors = {
    name: string,
    email: string,
    age: string,
    height: string,
    pincode: string,
    city: string,
    company: string,
}
const AllSections = [
    'Social',
    'Physiological',
    'Geographical',
    'Financial',
] as const;
type Section = typeof AllSections[number];
const nextSection = (currentSection: Section): Section => {

}
type Form = {
    state: FormState,
    fields: Fields,
    fieldErrors: FieldErrors,
    formErrors: string[],
    currentSection: Section,
}

type Person = {
    name: string,
    email: string,
    age: number,
    height: number,
    pincode: string,
    city: string,
    company: string
}
const toPerson = (fields: Fields) => {
    const toName = (input: string): Result<string, string> => {
        if (input && input.trim().length >= 0) {
            return {
                state: 'Ok',
                value: input.trim(),
            };
        } else {
            return {
                state: 'Error',
                error: 'Please fill your name.',
            };
        }
    };

    // if (toName(fields.name))
};

type AppState = {
    form: Form,
}

function fillName (state: AppState, event: Event): AppState {
    if (event.target instanceof HTMLInputElement) {
        return {
            ...state,
            form: {
                ...state.form,
                fields: {
                    ...state.form.fields,
                    name: event.target.value,
                },
            },
        };
    } else {
        return state;
    }
}

function fillAge (state: AppState, event: Event): AppState {
    if (event.target instanceof HTMLInputElement) {
        return {
            ...state,
            form: {
                ...state.form,
                fields: {
                    ...state.form.fields,
                    age: event.target.value,
                },
            },
        };
    } else {
        return state;
    }
}

function view (state: AppState): ElementVNode<AppState> {
    return form({}, [
        label({}, [
            text('Name'),
            input({type: 'text', value: state.form.fields.name, onchange: fillName}, []),
        ]),
        label({}, [
            text('Age'),
            input({type: 'text', value: state.form.fields.age, onchange: fillAge}, []),
        ]),
        div({}, [
            p({}, [text(`Name: ${state.form.fields.name}`)]),
            p({}, [text(`Age: ${state.form.fields.age}`)]),
        ]),
    ]);
}

const initialState: AppState = {
    form: {
        state: 'Filling',
        fields: {
            name: '',
            email: '',
            age: '',
            height: '',
            pincode: '',
            city: '',
            company: '',
        },
        fieldErrors: {
            name: '',
            email: '',
            age: '',
            height: '',
            pincode: '',
            city: '',
            company: '',
        },
        formErrors: [],
    },
};

function initApp (node: HTMLElement) {
    app({
        init: initialState,
        view: view,
        node: node,
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const root = document.getElementById('root');
    if (root) {
        initApp(root);
    } else {
        throw Error('Failed to find root element.');
    }
});
