let template;

const createNewTodoNode = () => {
    if (!template) {
        template = document.getElementById('todo-item');
    }

    return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = (
    { text, completed },
    index,
    { deleteItem, toggleItemCompleted, updateItem },
) => {
    const element = createNewTodoNode();

    element.querySelector('input.edit').value = text;
    element.querySelector('label').textContent = text;

    if (completed) {
        element.classList.add('completed');
        element.querySelector('input.toggle').checked = true;
    }

    element
        .querySelector('button.destroy')
        .addEventListener('click', (e) => deleteItem(index));
    element.querySelector('input.toggle').addEventListener('click', (e) => {
        toggleItemCompleted(index);
    });
    element.addEventListener('dblclick', () => {
        element.classList.add('editing');
        element.querySelector('input.edit').focus();
    });
    element.querySelector('input.edit').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            element.classList.remove('editing');
            updateItem(index, e.target.value);
        }
    });

    return element;
};

const filterTodos = (todos, currentFilter) => {
    if (currentFilter === 'Active') {
        return todos.filter((todo) => !todo.completed);
    }
    if (currentFilter === 'Completed') {
        return todos.filter((todo) => todo.completed);
    }
    return [...todos];
};

export default (targetElement, { todos, currentFilter }, events) => {
    const element = targetElement.cloneNode(true);

    element.innerHTML = '';

    console.log(currentFilter);
    const filteredTodos = filterTodos(todos, currentFilter);

    filteredTodos
        .map((todo, index) => getTodoElement(todo, index, events))
        .forEach((elem) => {
            element.appendChild(elem);
        });

    return element;
};
