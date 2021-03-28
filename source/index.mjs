import getTodos from './getTodos.mjs';
import todosView from './view/todos.mjs';
import filtersView from './view/filters.mjs';
import counterView from './view/counter.mjs';

import registry from './registry.mjs';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
    todos: getTodos(),
    currentFillter: 'All',
};

const render = () => {
    window.requestAnimationFrame(() => {
        const main = document.querySelector('.todoapp');
        const newMain = registry.renderRoot(main, state);
        main.replaceWith(newMain);
    });
};

window.setInterval(() => {
    state.todos = getTodos();
    render();
}, 5000);

render();
