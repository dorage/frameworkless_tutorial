let template;

const getTemplate = () => {
    if (!template) {
        template = document.getElementById('todo-app');
    }

    return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
    targetElement
        .querySelector('.new-todo')
        .addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                events.addItem(e.target.value);
                e.target.value = '';
            }
        });
};

export default (targetElement, state, events) => {
    const element = targetElement.cloneNode(true);

    element.innerHTML = '';
    element.appendChild(getTemplate());

    addEvents(element, events);

    return element;
};
