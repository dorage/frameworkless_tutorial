const isNodeChanged = (node1, node2) => {
    const n1Attributes = node1.attributes;
    const n2Attributes = node2.attributes;
    // attributes 가 추가되었거나 삭제되었을때
    if (n1Attributes.length !== n2Attributes.length) {
        return true;
    }

    const differentAttribute = Array.from(n1Attributes).find((attr) => {
        const { name } = attr;
        const attr1 = node1.getAttribute(name);
        const attr2 = node2.getAttribute(name);

        return attr1 !== attr2;
    });

    // attribute 값이 달라지지 않았다면 undefined를 반환
    if (differentAttribute) {
        return true;
    }

    // attribute가 없는 노드의 textContent가 변경되었을때
    if (
        node1.children.length === 0 &&
        node2.children.length === 0 &&
        node1.textContent !== node2.textContent
    ) {
        return true;
    }

    return false;
};

const applyDiff = (parentNode, realNode, virtualNode) => {
    // 가상노드가 정의되지 않은 경우 실제노드를 삭제한다.
    if (realNode && !virtualNode) {
        console.log('realNode removed!');
        realNode.remove();
        return;
    }
    // 실제노드가 정의되지 않았지만 가상노드가 정의된 경우 부모노드에 추가한다.
    if (!realNode && virtualNode) {
        console.log('virtualNoded added!');
        parentNode.appendChild(virtualNode);
        return;
    }
    // 두 노드가 모두 정의된 경우 차이를 확인한다.
    if (isNodeChanged(virtualNode, realNode)) {
        console.log('realNode is replaced with virtualNode!');
        realNode.replaceWith(virtualNode);
        return;
    }

    // 모든 하위 노드에 대하여 동일한 Diff 알고리즘을 적용한다.
    const realChildren = Array.from(realNode.children);
    const virtualChildren = Array.from(virtualNode.children);

    const max = Math.max(realChildren.length, virtualChildren.length);
    for (let i = 0; i < max; i++) {
        applyDiff(realNode, realChildren[i], virtualChildren[i]);
    }
};

export default applyDiff;
