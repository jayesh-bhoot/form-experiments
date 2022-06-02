import {div, form, input, label, p, text} from '@hyperapp/html';
import {app, ElementVNode} from 'hyperapp';

type InputField =
    | { state: 'Untouched', value: '' }
    | { state: 'Touched', value: string }

const emptyField = (): InputField => ({state: 'Untouched', value: ''});

type Fields = {
    name: InputField,
    email: InputField,
    age: InputField,
    height: InputField,
    pincode: InputField,
    city: InputField,
    company: InputField
}

const AllSections = [
    'Social',
    'Physiological',
    'Geographical',
    'Financial',
] as const;
type Section = typeof AllSections[number];

const FieldsOrder = [

]

type Person = {
    name: string,
    email: string,
    age: number,
    height: number,
    pincode: string,
    city: string,
    company: string
}

type Result<T, E> =
    | { state: 'Ok', value: T }
    | { state: 'Error', error: E }

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

const error = (field: InputField, error: string) => {
    if (field.state === 'Untouched') {
        return '';
    } else {
        return error;
    }
};

type Form = {
    fields: Fields,
}

type State = {
    form: Form,
}

function fillName (state: State, event: Event): State {
    if (event.target instanceof HTMLInputElement) {
        return {
            ...state,
            form: {
                ...state.form,
                fields: {
                    ...state.form.fields,
                    name: {
                        state: 'Touched',
                        value: event.target.value,
                    },
                },
            },
        };
    } else {
        return state;
    }
}

function fillAge (state: State, event: Event): State {
    if (event.target instanceof HTMLInputElement) {
        return {
            ...state,
            form: {
                ...state.form,
                fields: {
                    ...state.form.fields,
                    age: {
                        state: 'Touched',
                        value: event.target.value,
                    },
                },
            },
        };
    } else {
        return state;
    }
}

function view (state: State): ElementVNode<State> {
    return form({}, [
        label({}, [
            text('Name'),
            input({type: 'text', value: state.form.fields.name.value, onchange: fillName}, []),
        ]),
        label({}, [
            text('Age'),
            input({type: 'text', value: state.form.fields.age.value, onchange: fillAge}, []),
        ]),
        div({}, [
            p({}, [text(`Name: ${state.form.fields.name.value}`)]),
            p({}, [text(`Age: ${state.form.fields.age.value}`)]),
        ]),
    ]);
}

const initialState: State = {
    form: {
        fields: {
            name: emptyField(),
            email: emptyField(),
            age: emptyField(),
            height: emptyField(),
            pincode: emptyField(),
            city: emptyField(),
            company: emptyField(),
        },
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
