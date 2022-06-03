import {initApp} from './app';

window.addEventListener('DOMContentLoaded', (event) => {
    const root = document.getElementById('root');
    if (root) {
        initApp(root);
    } else {
        throw Error('Failed to find root element.');
    }
});
