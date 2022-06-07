import {h1, section, text} from '@hyperapp/html';
import {app, ElementVNode} from 'hyperapp';
import {firstSection, Form, viewForm} from './form';

export type AppState = {
    form: Form,
}

export function view (state: AppState): ElementVNode<AppState> {
    return section({}, [
        h1({'class': 'PageTitle'}, [text("Make a person")]),
        viewForm(state.form)]);
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
