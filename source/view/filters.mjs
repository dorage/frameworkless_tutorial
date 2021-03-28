export default (targetElement, { currentFilter }, { changeFilter }) => {
    const element = targetElement.cloneNode(true);
    Array.from(element.querySelectorAll('li a')).forEach((a) => {
        if (a.textContent === currentFilter) {
            a.classList.add('selected');
        } else {
            a.classList.remove('selected');
        }

        a.addEventListener('click', (e) => {
            e.preventDefault();
            changeFilter(a.textContent);
        });
    });
    return element;
};
