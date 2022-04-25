import {div, form, input, label, p, text} from '@hyperapp/html';
import {app, ElementVNode} from 'hyperapp';

type FormSection =
    | 'PersonalInfo'
    | 'PropertyInfo'

type Inputs = {
    name: string,
    age: string,
    address: string,
}

type Form = {
    fillingSection: FormSection,
    inputs: Inputs,
}

type State = {
    form: Form
}

function fillName (state: State, event: Event): State {
    if (event.target instanceof HTMLInputElement) {
        return {
            ...state,
            name: event.target.value,
        };
    } else {
        return state;
    }
}

function fillAge (state: State, event: Event): State {
    if (event.target instanceof HTMLInputElement) {
        return {
            ...state,
            age: event.target.value,
        };
    } else {
        return state;
    }
}

function view (state: State): ElementVNode<State> {
    return form({}, [
        label({}, [
            text('Name'),
            input({type: 'text', value: state.name, onchange: fillName}, []),
        ]),
        label({}, [
            text('Age'),
            input({type: 'text', value: state.age, onchange: fillAge}, []),
        ]),
        div({}, [
            p({}, [text(`Name: ${state.name}`)]),
            p({}, [text(`Age: ${state.age}`)]),
        ]),
    ]);
}

const initialState: State = {
    form: {
        fillingSection: 'PersonalInfo',
        inputs: {
            name: '',
            age: '',
            address: '',
        },
    }
};

function initialize (node: HTMLElement) {
    app({
        init: initialState,
        view: view,
        node: node,
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const root = document.getElementById('root');
    if (root) {
        initialize(root);
    } else {
        throw Error('Failed to find root element.');
    }
});
