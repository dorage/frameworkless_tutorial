import getTodos from './getTodos.mjs';
import appView from './view/app.mjs';

const state = {
    todos: getTodos(),
    currentFillter: 'All',
};

window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = appView(main, state);
    main.replaceWith(newMain);
});
