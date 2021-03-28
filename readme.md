# Frameworkless Front-end Development Tutorial

프레임워크 없는 프론트엔드 개발을 따라가는 저장소

## Chapter.02 - 02

하나의 커다란 view 에서 조그만 view들로 교체되었다.
하나의 거대한 함수에서 모든 상황의 view를 조작하는것보다 잘게 쪼개어 단위별로 조작할 수 있어 수정이 용이한것같다.\
다만, view가 추가될때마다 app에서 추가적으로 연결을 해줘야하는 불편함이 있고 어플리케이션이 커질수록 app.mjs의 view 업데이트 코드가 두꺼워진다.

## Chapter.02 - 03

registry 와 wrapper함수를 만들어 data-component를 갖고있는 요소들이 자동적으로 연결되게 만들었다.

```javascript
/// view/app.mjs
import todosView from './todos.mjs';
import filtersView from './filters.mjs';
import counterView from './counter.mjs';

export default (targetElement, state) => {
    const element = targetElement.cloneNode(true);

    const list = element.querySelector('.todo-list');
    const filter = element.querySelector('.filters');
    const counter = element.querySelector('.todo-count');

    list.replaceWith(todosView(list, state));
    filter.replaceWith(filtersView(filter, state));
    counter.replaceWith(counterView(counter, state));

    return element;
};
```

위 코드는 아래와 같이 변경되었다.

```javascript
// index.mjs
import getTodos from './getTodos.mjs';
import todosView from './view/todos.mjs';
import filtersView from './view/filters.mjs';
import counterView from './view/counter.mjs';

import registry from './registry.mjs';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
    todos: getTodos(),
    currentFillter: 'All',
};

window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = registry.renderRoot(main, state);
    main.replaceWith(newMain);
});
```

또한 동적인 데이터 렌더링을 위해 5초마다 view가 업데이트 되도록 변경하였다.
이는 소규모 어플리케이션에서는 충분한 성능을 발휘하지만 대규모 프로젝트에선 성능을 저하시킬 수 있다고 한다.
