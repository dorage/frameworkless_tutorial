export default (targetElement, { todos }) => {
    const element = targetElement.cloneNode(true);

    const length = todos.length;
    if (length === 1) {
        element.textContent = '1 Item left.';
    } else {
        element.textContent = `${length} Items left.`;
    }

    return element;
};
