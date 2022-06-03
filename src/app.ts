import {button, div, form, h1, input, label, li, p, section, span, text, ul} from '@hyperapp/html';
import {app, ElementVNode} from 'hyperapp';
import {fillField, firstSection, Form, submit} from './form';

export type AppState = {
    form: Form,
}

export function view (state: AppState): ElementVNode<AppState> {
    return section({}, [
        h1({}, [text(state.form.state)]),
        form({onsubmit: submit}, [
            ul({}, state.form.formErrors.map(error => li({}, text(error)))),
            div({}, [
                label({'for': 'name'}, [
                    span({}, text('Name')),
                    span({}, text(state.form.fieldErrors.name)),
                ]),
                input({type: 'text', name: 'name', id: 'name', value: state.form.fields.name, onchange: fillField}, []),
            ]),
            div({}, [
                label({'for': 'age'}, [
                    span({}, text('Age')),
                    span({}, text(state.form.fieldErrors.age)),
                ]),
                input({type: 'text', name: 'age', id: 'age', value: state.form.fields.age, onchange: fillField}, []),
            ]),
            button({type: 'submit'}, [text('Continue')]),
            div({}, [
                p({}, [text(`Name: ${state.form.fields.name}`)]),
                p({}, [text(`Age: ${state.form.fields.age}`)]),
            ]),
        ])]);
}

export const initialState: AppState = {
    form: {
        state: 'Filling',
        currentSection: firstSection(),
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

export function initApp (node: HTMLElement) {
    app({
        init: initialState,
        view: view,
        node: node,
    });
}
