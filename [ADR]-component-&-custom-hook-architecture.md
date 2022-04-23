## component & custom hook architecture
### 2021-10-27
### Status
*Accepted*
### Context
- 기존 container & component(presenter) 구조의 비효율 및 불편함 대두
    - 의미없는 props drilling 발생
    - 모체 container의 re-render(state 변화 등)에 따른 자식 DOM element 및 component의 비효율적인 re-render
    - container 로직 및 코드가 복잡하고 거대해짐 (혹은 container depth가 깊어짐)
    - 타인 혹은 예전 코드를 파악하거나 유지보수의 어려우며, 비효율적인 로직처리가 될 가능성이 큼
    - 서비스 기능의 추가/변경 시 확장의 어려움
      - container 및 component의 구분이 애매해짐
      - container 밑에 container가 들어가고, 그 밑 component 밑에 container가 들어가는 상황 등     
    - 현 FE 시장의 redux 등 global state management가 도입된 환경에서 지양하는 구조가 됨

- global state management(redux)와 hook의 도입과 함께 custom hook 및 순수 component 구조 논의

### Decision
- **추가사항** [[ADR] 비효율적인 component re render 현상 개선](https://github.com/linewalks/fe-common/wiki/%5B%08ADR%5D-%EB%B9%84%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-component-re-render-%ED%98%84%EC%83%81-%EA%B0%9C%EC%84%A0)을 바탕으로 반영 필요
- 역할(logic&presenter)이 아닌, 독립적인 기능 단위로 component를 구분
  - react는 UI library 그 이상 그 이하도 아니며, component 자체는 state를 감지하고 그려주는 역할로 활용
- 특정 로직이나 메서드는 custom hook 활용하여 관리
  - 여기서 hook이라는 표현이 애매해질 수 있는데, 하나의 hook이라기 보다는 여러 메서드가 결합된 객체이나 함수로 보는 것이 더 옳지 않을까 싶음.
- api 호출과 같은 비즈니스 로직은 thunk, saga 등을 통해서 분리시켜주면 좋다 (optional)
- 내부 로직을 custom hook으로 분리함으로써, component에서는 state 및 UI만 보면되기에, 역할별로 분리된다는 container 구조에서의 장점을 그대로 가져갈 수 있다.
  - 하지만 무리하게 이를 분리하기 위해 보일러플레이트를 만드는 경우라면 component가 순수하게 품고 있는 형태로 구현 가능
  - 어디까지나 독립성, 범용성, 가독성 및 유지보수성을 목적으로 나누는 것이기에 상황에 따라 달라질 수 있음
  - (기능별 구분, 확장성 등을 이유로) 초창기부터 무리하게 작은 단위로 component 및 custom hook를 나누게되면 개발 및 유지보수의 불편함이 생길 가능성 존재 (ex. 아토믹 디자인)

- usePagenation hook을 활용하는 ListFooter component
```js
const ListFooter = () => {
  const { page, searchTerm, ... } = useSelector(state => ({
      page: state.list.page,
      searchTerm: state.list.searchTerm,
      // ...
    }),
    shallowEqual
  )

  const { handlePagination, ... } = usePagenation()

  return (
    <div>
      <input value={searchTerm} onChange={...} />
      <div>{page}</div>
      <button onClick={() => handlePagination({ page, searchTerm, ... })}>
        next page
      </button>
    </div>
  )
}
```

- ListFooter에서 활용되는 로직 usePagenation hook
```js
const usePagenation = () => {
  // const store = useStore();

  // parms를 받을 수도 있고, useStore를 통해서 가져올 수도 있다.
  // 혹은 비즈니스 로직일 경우, thunk나 saga로 위임하는 것도 방법이다.
  const handlePagination = useCallback((params) => {
    // const params = { page: store.getState().list.page, ... }
    fetctList(params)
    // ...
  }, [])

  // ...

  return {
    handlePagination,
    // ...
  }
}
```

### Consequences
- CLUE 신규 feature 단위 시범 적용

### References
- [react custom hook 만들기](https://ko.reactjs.org/docs/hooks-custom.html)
- [Dan Abramov (redux 창시자) : Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Dan Abramov 관련 트윗](https://twitter.com/dan_abramov/status/1056158199877943297)
