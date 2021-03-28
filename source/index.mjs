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

const render = () => {
    window.requestAnimationFrame(() => {
        const main = document.querySelector('#root');
        const newMain = registry.renderRoot(main, state);
        applyDiff(document.body, main, newMain);
    });
};

render();
