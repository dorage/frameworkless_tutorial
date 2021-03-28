let template;

const createNewTodoNode = () => {
    if (!template) {
        template = document.getElementById('todo-item');
    }

    return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = ({ text, completed }, index, events) => {
    const element = createNewTodoNode();

    element.querySelector('input.edit').value = text;
    element.querySelector('label').textContent = text;

    if (completed) {
        element.classList.add('completed');
        element.querySelector('input.toggle').checked = true;
    }

    const handler = (e) => events.deleteItem(index);
    element.querySelector('button.destroy').addEventListener('click', handler);

    return element;
};

export default (targetElement, { todos }, events) => {
    const element = targetElement.cloneNode(true);

    element.innerHTML = '';
    todos
        .map((todo, index) => getTodoElement(todo, index, events))
        .forEach((elem) => {
            element.appendChild(elem);
        });

    return element;
};
