import getTodos from './getTodos.mjs';
import appView from './view/app.mjs';
import todosView from './view/todos.mjs';
import filtersView from './view/filters.mjs';
import counterView from './view/counter.mjs';
import applyDiff from './applyDiff.mjs';
import registry from './registry.mjs';

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
    todos: getTodos(),
    currentFillter: 'All',
};

const events = {
    deleteItem: (index) => {
        state.todos.splice(index, 1);
        render();
    },
    addItem: (text) => {
        state.todos.push({ text, completed: false });
        render();
    },
};

const render = () => {
    window.requestAnimationFrame(() => {
        const root = document.querySelector('#root');
        const newRoot = registry.renderRoot(root, state, events);
        applyDiff(document.body, root, newRoot);
    });
};

render();
