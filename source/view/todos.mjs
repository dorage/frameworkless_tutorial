const getTodoElement = ({ text, completed }) => {
    return `
        <li ${completed ? 'class="completed"' : ''}>
            <div class="view">
                <input
                    ${completed ? 'checked' : ''}
                    class="toggle"
                    type="checkbox"
                    >
                <label>${text}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${text}">
        </li>
    `;
};

export default (targetElement, { todos }) => {
    const element = targetElement.cloneNode(true);

    const todoElements = todos.map(getTodoElement).join('');
    element.innerHTML = todoElements;

    return element;
};
