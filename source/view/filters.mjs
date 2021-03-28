export default (targetElement, { currentFilter }) => {
    const element = targetElement.cloneNode(true);
    Array.from(element.querySelector('li a')).forEach((a) => {
        if (a.textContent === currentFilter) {
            a.classList.add('selected');
        } else {
            a.classList.remove('selected');
        }
    });
    return element;
};
