import {div, form, input, label, p, text} from '@hyperapp/html';
import {app, ElementVNode} from 'hyperapp';

type Inputs = {
    name: string,
    email: string,
    gender: string,
    age: string,
    pincode: string,
    city: string,
    company: string
}

type Form = {
    inputs: Inputs,
}

type State = {
    form: Form
}

function fillName (state: State, event: Event): State {
    if (event.target instanceof HTMLInputElement) {
        return {
            ...state,
            form: {
                ...state.form,
                inputs: {
                    ...state.form.inputs,
                    name: event.target.value,
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
                inputs: {
                    ...state.form.inputs,
                    age: event.target.value,
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
            input({type: 'text', value: state.form.inputs.name, onchange: fillName}, []),
        ]),
        label({}, [
            text('Age'),
            input({type: 'text', value: state.form.inputs.age, onchange: fillAge}, []),
        ]),
        div({}, [
            p({}, [text(`Name: ${state.form.inputs.name}`)]),
            p({}, [text(`Age: ${state.form.inputs.age}`)]),
        ]),
    ]);
}

const initialState: State = {
    form: {
        inputs: {
            name: '',
            email: '',
            gender: '',
            age: '',
            pincode: '',
            city: '',
            company: '',
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
