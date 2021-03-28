import todosView from './todos.mjs';
import filtersView from './filters.mjs';
import counterView from './counter.mjs';

export default (targetElement, state) => {
    const element = targetElement.cloneNode(true);

    const list = element.querySelector('.todo-list');
    const filter = element.querySelector('.filters');
    const counter = element.querySelector('.todo-count');

    list.replaceWith(todosView(list, state));
    filter.replaceWith(filtersView(filter, state));
    counter.replaceWith(counterView(counter, state));

    return element;
};
