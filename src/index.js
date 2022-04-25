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
function fillName(state, event) {
    if (event.target instanceof HTMLInputElement) {
        return __assign(__assign({}, state), { name: event.target.value });
    }
    else {
        return state;
    }
}
function fillAge(state, event) {
    if (event.target instanceof HTMLInputElement) {
        return __assign(__assign({}, state), { age: event.target.value });
    }
    else {
        return state;
    }
}
function view(state) {
    return form({}, [
        label({}, [
            text('Name'),
            input({ type: 'text', value: state.name, onchange: fillName }, []),
        ]),
        label({}, [
            text('Age'),
            input({ type: 'text', value: state.age, onchange: fillAge }, []),
        ]),
        div({}, [
            p({}, [text("Name: ".concat(state.name))]),
            p({}, [text("Age: ".concat(state.age))]),
        ])
    ]);
}
var initialState = {
    name: '',
    age: ''
};
function initialize(node) {
    app({
        init: initialState,
        view: view,
        node: node
    });
}
window.addEventListener('DOMContentLoaded', function (event) {
    var root = document.getElementById('root');
    if (root) {
        initialize(root);
    }
    else {
        throw Error('Failed to find root element.');
    }
});
