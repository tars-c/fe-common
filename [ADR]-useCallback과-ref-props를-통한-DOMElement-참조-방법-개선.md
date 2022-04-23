## useCallback과 ref props를 통한 DOMElement 참조 방법 개선

### 2022-02-09

### Status
Accepted

### Context

- 기존에 사용하던 useEffect의 dependency 배열에 useRef를 통한 DOMElement 참조 방식이 [안전하지 않다는 내용](https://stackoverflow.com/questions/60476155/is-it-safe-to-use-ref-current-as-useeffects-dependency-when-ref-points-to-a-dom)을 확인
- useRef를 통해 참조한 DOMElement가 변경되어도 useEffect 로직이 ref.current 로 인해서 트리거 되는것이 아니고 상위 컴포넌트 리렌더링에 의해 트리거 됨 
  → **불필요한 참조 관계**
- 이와 같이 불안전한 로직은 useRef로 참조하고 있는 DOMElement가 unmount되어 ref.current가 undefined가 될 때 dependency 배열이 트리거 되지 않아 사이드 이펙트가 발생할 가능성이 높음 - [unmount 예시](https://codesandbox.io/s/bad-example-ref-does-not-handle-unmount-nrk28?fontsize=14&hidenavigation=1&theme=dark&file=/index.js)

```
function MeasureExample() {
  const [rect, ref] = useClientRect();

  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  );
}

// useEffect와 useRef 를 통한 DOM 참조
function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useRef()

  useEffect(() => {
    if (ref.current !== null) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [ref.current])

  return [rect, ref];
}
```

### Decision
- 위의 상황을 useCallback과 ref props 를 활용해 다음과 같이 개선 가능 - [React 공식 문서 참고](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)
- ref props에 callback 함수를 전달하면 parameter 에 DOMElement를 전달 
- 이와 같은 로직은 unmount 상황을 [정상적으로 처리](https://codesandbox.io/s/good-example-handle-the-node-directly-pkvno?fontsize=14&hidenavigation=1&theme=dark&file=/index.js)하는 모습을 볼 수 있음

```
function MeasureExample() {
  const [rect, ref] = useClientRect();

  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  );
}

// useCallback을 통한 DOM 참조
function useClientRect() {
  const [rect, setRect] = useState(null);

  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```

### Consequence
- useEffect dependency DOM 참조 방식에 대한 로직을 개선(ex: useElementRect)
- 추후 관련 로직 구성 시 해당 ADR의 내용을 참고

### Reference
- [useEffect의 dependency로 DOM요소를 다루는 것이 안전할까?](https://stackoverflow.com/questions/60476155/is-it-safe-to-use-ref-current-as-useeffects-dependency-when-ref-points-to-a-dom)
- [Ref objects inside useEffect Hooks](https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780)
- [How can I measure a DOM node?](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)
