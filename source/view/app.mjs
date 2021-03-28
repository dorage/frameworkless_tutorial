let template;

const createAppElement = () => {
    if (!template) {
        template = document.getElementById('todo-app');
    }

    return template.content.firstElementChild.cloneNode(true);
};

export default (targetElement) => {
    const element = targetElement.cloneNode(true);

    element.innerHTML = '';
    element.appendChild(createAppElement());

    return element;
};
