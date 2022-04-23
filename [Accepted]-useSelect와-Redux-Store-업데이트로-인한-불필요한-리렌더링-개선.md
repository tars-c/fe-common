## useSelect와 Redux Store 업데이트로 인한 불필요한 리렌더링 개선

### 2022-04-05

### Status
Proposed

### Context
- Redux Store의 내부 상태값이 변경되면 해당 Store를 구독하고 있는 컴포넌트에 대해 상태 일치화를 위해 리렌더링이 발생
- 이러한 리렌더링의 범위를 제한하지 못하고 커스텀 훅의 재사용, props를 통한 상태값 전달 등으로 인해 불필요한 리렌더링이 발생하고 있음
- 인지하지 못한 리렌더링은 여러 사이드 이펙트를 발생시켜 웹 페이지의 안정성을 떨어뜨리고, 렌더링이 최적화되지 못한다는 문제가 있음

#### 👉 &nbsp; useSelector 리렌더링 원인
- 상태 변경 시 관련 스토어를 구독하는 부분에 대해서는 리렌더링 발생
<details>
    <summary> <a href="https://github.com/reduxjs/react-redux/blob/607f1ba30417b631a4df18665dfede416c7208cf/src/hooks/useSelector.js#L69">useSelector 코드</a></summary>


```typescript
const refEquality = (a, b) => a === b

function useSelectorWithStoreAndSubscription(
  selector,
  equalityFn,
  store,
  contextSub
) {
  const [, forceRender] = useReducer(s => s + 1, 0) // 의미 없는 상태 변경으로 강제 렌더링 수행 
  const subscription = useMemo(() => new Subscription(store, contextSub), [
    store,
    contextSub
  ])

  ...

  let selectedState

  try {
    if (
      selector !== latestSelector.current ||
      latestSubscriptionCallbackError.current
    ) {
      selectedState = selector(store.getState()) // 스토어의 상태값 fetch
    } else {
      selectedState = latestSelectedState.current
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      err.message += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.current.stack}\n\n`
    }

    throw err
  }

  useIsomorphicLayoutEffect(() => {
    latestSelector.current = selector
    latestSelectedState.current = selectedState  // 구독했던 상태값 저장
    latestSubscriptionCallbackError.current = undefined
  })

  useIsomorphicLayoutEffect(() => {
    function checkForUpdates() {
      try {
        const newSelectedState = latestSelector.current(store.getState())

        if (equalityFn(newSelectedState, latestSelectedState.current)) { // 동등 비교 (equalityFn 사용)
          return
        }
        latestSelectedState.current = newSelectedState
      } catch (err) {
        latestSubscriptionCallbackError.current = err
      }

      forceRender({})
    }

    subscription.onStateChange = checkForUpdates // 상태 변경 시 리렌더링 체크 트리거
    subscription.trySubscribe()

    checkForUpdates()

    return () => subscription.tryUnsubscribe()
  }, [store, subscription])

  return selectedState
}

export function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext =
    context === ReactReduxContext
      ? useDefaultReduxContext
      : () => useContext(context)

  return function useSelector(selector, equalityFn = refEquality) {
    ... 
    const { store, subscription: contextSub } = useReduxContext()

    return useSelectorWithStoreAndSubscription(
      selector,
      equalityFn,
      store,
      contextSub
    )
  }
}

export const useSelector = createSelectorHook()
```

</details>


### Decision
#### 1. custom hooks 재사용에 대한 상태 오염 방지
- 한 커스텀 훅에서 담당하는 로직이 많아지고 구독하는 상태가 많아지면서 리렌더링이 발생되는 요인이 늘어남
- 또한 해당 커스텀 훅을 재사용하면서 사용함에 있어서 재사용되는 로직 이외의 로직에서 구독하는 상태값으로 인해 불필요한 리렌더링이 발생할 수 있음
- 재사용하기 위한 부분은 따로 추출하여 다른 로직으로 인한 구독 상태를 통해 잘못된 리렌더링이 발생하는 상황을 방지

```javascript
// before

const useSideSection = () => {
   const { a, b, c } = useSelector((state) => state.sideSection)
   
   const handleCheck = () => { // a, b 와 관련된 계산 }
   const handleC = () => { // c 와 관련된 상태 조작 }  // !! c로 인해 useSideSection 내 handleCheck만 사용하려는 부분에서 리렌더링 발생 !!

   return {
       handleCheck,
       handleC
   }
}
```

```javascript
// after

// (a, b) 계산 로직과 c를 분리 
const useCheck = () => {
    const { a, b } = useSelector((state) => state.sideSection)
    const handleCheck = () => { // a, b 와 관련된 계산 }

    return { handleCheck }
}
const useSideSection = () => {
    const { c } = useSelector((state) => state.sideSection)
    const handleC = () => { // c 와 관련된 상태 조작 }

    return { handleC }
}
```

<br />

#### 2. useSelector 구독 로직에 대한 리렌더링 범위 최소화
- 기본적으로 `useSelect` 를 통해 상태를 구독하는 로직은 리렌더링이 발생할 수 있음을 인지
- 만약 리렌더링이 일어나선 안되는 부분에 대해서는 `useSelect` 구독 로직을 내부 컴포넌트로 이동하여 리렌더링의 범위를 최소화할 것

```javascript
// before

const InfoPage = () => {
  ...
  // 2. 스토어 구독에 따른 리렌더링 트리거
  const { items, modalInfo } = useSideSection({ isMine }) // 내부에 FeatureDetailContainer와 관계 있는 스토어 구독 로직이 존재하는 커스텀 훅

  const sideInfo = {
    isMine: isMine ?? false,
    hasControl: true,
    dropdownObj: { items },
  }

  // 3. MainLayout이 리렌더링
  // 4. 부모 요소가 리렌더링되어 자식 요소까지 리렌더링 -> FeatureDetailContainer, AlertModal이 다시 리렌더링 (불필요한 리렌더링 발생)
  return (
    <MainLayout
      ...
      existSideSection
      sideInfo={sideInfo}
    >
      {/* 1. 내부에서 상태를 변경시켜 관련 스토어를 구독하는 부분이 리렌더링 */}
      <FeatureDetailContainer />  
      <AlertModal {...modalInfo} />
    </MainLayout>
  )
}
```

```javascript
// after

const InfoPage = () => {
  ...

  // 3. MainLayout이 리렌더링되지 않고 FeatureSideSection 만 리렌더링 (불필요한 리렌더링 최소화)
  return (
    <MainLayout
      ...
    >
      {/* 1. 리렌더링 발생 */}
      <FeatureDetailContainer />
      <FeatureSideSection />
    </MainLayout>
  )
}

// 스토어 구독 로직 분리
const FeatureSideSection = () => {
  ...
  // 2. FeatureDetailContainer 관련 스토어 구독에 따른 리렌더링 트리거
  const { items, modalInfo } = useSideSection({ isMine }) 

  const sideInfo = {
    isMine: isMine ?? false,
    hasControl: true,
    dropdownObj: { items },
  }

  return (
    <>
      <SideInformationSection {...sideInfo} />
      <AlertModal {...modalInfo} />
    </>
  )
}
```

- [useSelector 로직 분리 예제](https://codesandbox.io/s/useselector-rojig-bunri-hkyldc)
### Consequence
- 위에 제안된 방식으로 구조개선
    - 커스텀 훅의 과도한 로직 분리
    - 컨테이너 내 커스텀 훅 사용제한을 통한 리렌더링 scope 제한
- 추가적으로 useStore를 사용하여 최적화하는 기법 활용
    - [관련 ADR 참고](https://github.com/linewalks/fe-common/wiki/%5B%08ADR%5D-%EB%B9%84%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-component-re-render-%ED%98%84%EC%83%81-%EA%B0%9C%EC%84%A0)


### Reference
- [How useSelector can trigger an update only when we want it to](https://medium.com/async/how-useselector-can-trigger-an-update-only-when-we-want-it-to-a8d92306f559)
- [useSelector 구조](https://react-redux.js.org/api/hooks#useselector)
- [useSelector 전체 코드](https://github.com/reduxjs/react-redux/blob/607f1ba30417b631a4df18665dfede416c7208cf/src/hooks/useSelector.js#L69)
- [강제 렌더링 수행 패턴](https://ko.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate)
- [useSelector 최적화](https://react.vlpt.us/redux/08-optimize-useSelector.html)
- [React 에서 useSelector 최적화 하는 3가지 방법](https://blog.woolta.com/categories/1/posts/200)
- [Redux ShallowEqual Code](https://github.com/reduxjs/react-redux/blob/master/src/utils/shallowEqual.ts)