let template;

const createNewTodoNode = () => {
    if (!template) {
        template = document.getElementById('todo-item');
    }

    return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = ({ text, completed }) => {
    const element = createNewTodoNode();

    element.querySelector('input.edit').value = text;
    element.querySelector('label').textContent = text;

    if (completed) {
        element.classList.add('completed');
        element.querySelector('input.toggle').checked = true;
    }

    return element;
};

export default (targetElement, { todos }) => {
    const element = targetElement.cloneNode(true);

    element.innerHTML = '';
    todos.map(getTodoElement).forEach((elem) => {
        element.appendChild(elem);
    });

    return element;
};
