# Frameworkless Front-end Development Tutorial

프레임워크 없는 프론트엔드 개발을 따라가는 저장소

🔗 netlify | https://inspiring-galileo-63da51.netlify.app/ \
🔗 book | https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=260034588&start=slayer \
🔗 source | https://github.com/Apress/frameworkless-front-end-development

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
    currentFilter: 'All',
};

window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = registry.renderRoot(main, state);
    main.replaceWith(newMain);
});
```

또한 동적인 데이터 렌더링을 위해 5초마다 view가 업데이트 되도록 변경하였다.
이는 소규모 어플리케이션에서는 충분한 성능을 발휘하지만 대규모 프로젝트에선 성능을 저하시킬 수 있다고 한다.

## Chapter.02 - 05

applyDiff 함수를 추가하고 기존 노드와 새로운 노드의 변경된 부분이 있는지를 체크한다.

-   속성 수가 다르다.
-   하나 이상의 속성이 변경되었다.
-   노드에는 자식이 없으며, textContent가 다르다.

```
시기상조의 최적화는 모든(또는 적어도 대부분의) 악의 근원이다.
- 도널드 크루스 -
```

## Chapter.03 - 01

이벤트핸들러의 추가를 위해 DOM 생성 및 조작을 텍스트를 통하지않고 template을 이용하여 생성하는 형태로 변경하였다.

## Chapter.03 - 02

state를 수정하고 새로운 render()를 수동으로 호출하는 간단한 이벤트인 todo추가/삭제 이벤트를 추가하였다.

## Chapter.03 - 03

모든 event를 생성하였고 각각의 view 컴포넌트에 이벤트를 등록해주었다.

## Chapter.03 - 04

todo리스트의 이벤트를 각 list의 요소마다 등록하지 않고 todo-list에 등록하여 event target을 캐치하여 위임하는 방식으로 진행.
