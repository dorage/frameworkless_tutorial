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
    currentFilter: 'All',
};

const events = {
    addItem: (text) => {
        state.todos.push({ text, completed: false });
        render();
    },
    updateItem: (index, text) => {
        console.log(text);
        state.todos[index].text = text;
        render();
    },
    deleteItem: (index) => {
        state.todos.splice(index, 1);
        render();
    },
    toggleItemCompleted: (index) => {
        const { completed } = state.todos[index];
        state.todos[index].completed = !completed;
        render();
    },
    completeAll: () => {
        state.todos.forEach((todo) => (todo.completed = true));
        render();
    },
    clearCompleted: () => {
        state.todos = state.todos.filter((t) => !t.completed);
        render();
    },
    changeFilter: (filter) => {
        console.log(filter);
        state.currentFilter = filter;
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
