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

    element.querySelector('button.destroy').dataset.index = index;
    element.querySelector('input.toggle').dataset.index = index;
    element.querySelector('input.edit').dataset.index = index;

    // 이벤트 위임방법을 알아봐야겠다.
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
    const newTodoList = targetElement.cloneNode(true);

    newTodoList.innerHTML = '';

    console.log(currentFilter);
    const filteredTodos = filterTodos(todos, currentFilter);

    filteredTodos
        .map((todo, index) => getTodoElement(todo, index, events))
        .forEach((elem) => {
            newTodoList.appendChild(elem);
        });
    newTodoList.addEventListener('click', (e) => {
        if (e.target.matches('button.destroy')) {
            events.deleteItem(e.target.dataset.index);
        }
        if (e.target.matches('input.toggle')) {
            events.toggleItemCompleted(e.target.dataset.index);
        }
    });

    return newTodoList;
};
