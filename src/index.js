var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { div, form, input, label, p, text } from '@hyperapp/html';
import { app } from 'hyperapp';
var emptyField = function () { return ({ state: 'Untouched', value: '' }); };
var error = function (field, error) {
    if (field.state === 'Untouched') {
        return '';
    }
    else {
        return error;
    }
};
function fillName(state, event) {
    if (event.target instanceof HTMLInputElement) {
        return __assign(__assign({}, state), { form: __assign(__assign({}, state.form), { fields: __assign(__assign({}, state.form.fields), { name: {
                        state: 'Touched',
                        value: event.target.value
                    } }) }) });
    }
    else {
        return state;
    }
}
function fillAge(state, event) {
    if (event.target instanceof HTMLInputElement) {
        return __assign(__assign({}, state), { form: __assign(__assign({}, state.form), { fields: __assign(__assign({}, state.form.fields), { age: {
                        state: 'Touched',
                        value: event.target.value
                    } }) }) });
    }
    else {
        return state;
    }
}
function view(state) {
    return form({}, [
        label({}, [
            text('Name'),
            input({ type: 'text', value: state.form.fields.name.value, onchange: fillName }, []),
        ]),
        label({}, [
            text('Age'),
            input({ type: 'text', value: state.form.fields.age.value, onchange: fillAge }, []),
        ]),
        div({}, [
            p({}, [text("Name: ".concat(state.form.fields.name.value))]),
            p({}, [text("Age: ".concat(state.form.fields.age.value))]),
        ]),
    ]);
}
var initialState = {
    form: {
        fields: {
            name: emptyField(),
            email: emptyField(),
            gender: emptyField(),
            age: emptyField(),
            pincode: emptyField(),
            city: emptyField(),
            company: emptyField()
        }
    }
};
function initApp(node) {
    app({
        init: initialState,
        view: view,
        node: node
    });
}
window.addEventListener('DOMContentLoaded', function (event) {
    var root = document.getElementById('root');
    if (root) {
        initApp(root);
    }
    else {
        throw Error('Failed to find root element.');
    }
});
