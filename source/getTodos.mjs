const { faker } = window;

function createElement() {
    return {
        text: faker.random.word(2),
        completed: faker.random.boolean(),
    };
}

function repeat(elementFactory, number) {
    const array = [];
    for (let i = 0; i < number; i++) {
        array.push(elementFactory());
    }
    return array;
}

export default function () {
    const howMany = faker.random.number(10);
    return repeat(createElement, howMany);
}
