# 비효율적인 component re-render 현상 개선
2022-04-13

# **Status**

Accepted

# Context

- State, Component, Custom Hook 등이 상호의존성에 엮여 불필요하게 re-render가 일어나는 현상
- 가벼운 효율성 및 사이드 이펙트 이슈를 넘어, 현재 실 프로덕트 성능에 직접적인 영향을 주고 있음
- React.memo, useMemo, useCallback 등 기본적인 memoization 활용함에도 비효율적인 현상을 막지 못함
- State 및 Component, Custom Hook의 비효율적인 구조와 사용을 원인으로 예상

# Intro

## 1. component re-render

- component re-render 이슈는 복잡하게 생각할 것 없이 이하 5가지 원인에서 발생됨을 알고, 불필요한 이하 상황이 발생되지 않도록 구현되면 된다.
    - state 변경
    - 새로운 props
    - 부모 component re-render
    - shouldComponentUpdate
    - forceUpdate
- 현재 CLUE에서는 크게 이하와 같은 상황에서 발생되는 것을 볼 수 있음.
    - state 및 props 관리를 못해서 불필요하게 변동되는 경우
    - 모체 component 및 custom hook이 방대해서 불필요하게 state를 많이 가지고 있는 경우
    - 혹은 뎁스가 깊어지거나 비효율적으로 자식 component들을 많이 가지고 있는 경우
- 이하 내용은 React.memo, useMemo, useCallback 등을 적절히 사용하는 것을 기본으로 잡고 있으며, 이러한 memoization을 활용함에도 불필요한 re-render가 일어나는 상황을 다뤄본다.

## 2. redux store 및 useSelector

- 지난 번 회의에서 화두가 되었지만, redux store 및 useSelector는 state management library일 뿐이며, react state 관련 hook 및 component의 구조와 사용법이 주 원인으로 예상된다.
- redux store의 크기에 따라서 re-render가 일어나는 것은 아니며, 각 개발환경이나 코드 컨벤션, 가독성 및 유지보수성 등을 고려하여 설계하면 됨
- useSelector는 useState와 똑같이 state를 담고 감시하고 변동하는 state management 관련 hook이기에, useSelector을 잘게 나누거나 shallowEqual을 활용한 최적한 방법 외에는 useSelector가 re-render 이슈를 해결해주지는 못함 (벨로퍼트 참조)

# Discussion

```jsx
const useList = () => {
  const { list, page, searchTerm, orderDesc, inputTerm } = useSelector(
    state => ({
      list: state.list.list,
      page: state.list.page,
      searchTerm: state.list.searchTerm,
      orderDesc: state.list.orderDesc,
      inputTerm: state.list.inputTerm
    }),
    shallowEqual
  )
	
	const { etc } = useSelector(state => ({ etc: state.etc }),
		shallowEqual
	)
	
	const handleGetButton = useCallback(() => {
		// fetctList({page, searchTerm, etc, ...})
		// ...
	}, [page, searchTerm, orderDesc, etc, ... ])
	
	const handlePagination = useCallback(() => {
		// fetctList({page, searchTerm, etc, ...})
		// ...
	}, [page, searchTerm, orderDesc, etc, ... ])
	
	const sortFunc = useCallback(() => {
		// fetctList({page, searchTerm, etc, ...})
		// ...
	}, [page, searchTerm, orderDesc, etc, ... ])

	// ...

	return {
		handleGetButton
		handlePagination,
    sortFunc,
		// ...
	}
}
```

```jsx
const ListContainer = () => {
  const {
		handleGetButton
		handlePagination,
    sortFunc,
		// ...
  } = useList()

	const { list, page, inputTerm, ... } = useSelector(
	    state => ({
	      list: state.list.list,
	      page: state.list.page,
	      inputTerm: state.list.inputTerm
				// ...
	    }),
			shallowEqual
	  )

	return (
		<div>
			<ListHeader handleGetButton={handleGetButton} />
			<ListSearchBar inputTerm={inputTerm} />
			<ListTable list={list} />
			<ListFooter page={page} handlePagination={handlePagination} />
			// ...
		</div>
	)
}
```

## Case 1 : 특정 component 또는 custom hook이 비효율적으로 방대하여 나타나는 re-render

- 흔히 봐왔던 container 구조로 모체의 state가 변화되었을 때, 불필요하게 자식 component들이 re-render 되는 현상
- container 구조가 아니라도 하나의 component 안에서 다른 component를 불러오는 경우, props를 내리거나, state를 children으로 품거나, 메서드 등을 onClick과 같은 이벤트 트리거에 넣는 상황들
- react.memo를 활용하여 효율성을 개선 시킬 수 있지만, 자식 DOM element 및 styled-component 등이 지속해서 re-render trigger되는 상황 (+ case2, case3의 문제가 발생하기 쉬운 상황)

## Case 2 : custom hook의 state로 인한 re-render

- 제일 먼저 화두가 되었던 케이스로 custom hook 안의 특정 state의 변화로 인해서 리렌더되는 상황
- useList에서 etc라는 state가 필요하지만, ListContainer에서 필요하지 않았기에 처음에 리렌더 상황을 감지 못했었던 케이스

## ⭐️ Case 3 : useCallback 메서드 재할당으로 인한 re-render (CLUE 문제점)

- inputTerm이 바뀐 상황에 list나 page state 같은 경우는 react.memo가 알아서 props가 동일함을 인지하고 memoization 하기에 비효율적인 re-render를 방지해준다.
- 하지만 handlePagination이나 handleGetButton는 useCallback으로 감쌌었을지 언정, dependency의 변화로 인해 새롭게 할당되기에 새로운 props로 인지하여 react.memo가 잡지 못하고 re-render가 발생한다.

## ⭐️ Case 4 : component 및 custom hook을 역할별로 작게 나누어도, 같은 re-render 현상 발생

- 이하와 같이 component를 독립적으로 구성해도 page state가 변화 시에만 re-render가 되는 것이 아니라, usePagenation hook 안의 각 state들이 변화 시에도 re-render된다.

```jsx
const usePagenation = () => {
	const { list, page, searchTerm, orderDesc, inputTerm } = useSelector(
	    state => ({
	      list: state.list.list,
	      page: state.list.page,
	      searchTerm: state.list.searchTerm,
	      orderDesc: state.list.orderDesc,
	      inputTerm: state.list.inputTerm
	    }),
			shallowEqual
	  )

	const { etc } = useSelector(state => ({ etc: state.etc }),
		shallowEqual
	)
	
	const handlePagination = useCallback(() => {
		// fetctList({page, searchTerm, etc, ...})
		// ...
	}, [page, searchTerm, orderDesc, etc, ... ])
	
	// ...

	return {
		handlePagination,
		// ...
	}
}
```

```jsx
const ListFooter = () => {
	const { page } = useSelector(state => ({ page: state.list.page }),
		shallowEqual
	)

	const {
		handlePagination,
		// ...
  } = usePagenation()
	
	return (
		<div>
			<div>{page}</div>
			<button onClick={handlePagination} >next page</button>
		</div>
	)

}
```

## ⭐️ Case 5 : custom hook 대신 caller(component)가 불필요한 parameter(state)를 가진 경우

- custom hook의 state를 제거하기 위해 caller(component)로부터 parameter를 받으려해도, 결국 해당 caller는 필요 없는 parameter 관련 state를 들고 있어야 한다.
- 이는 해당 state가 변화할 때, 불필요한 렌더를 유발시킨다.

```jsx
const ListFooter = () => {
	const { page } = useSelector(state => ({ page: state.list.page }),
		shallowEqual
	)

	// 해당 component에 필요 없는 state
	const { searchTerm, orderDesc, ... } = useSelector(
	    state => ({
	      searchTerm: state.list.searchTerm,
	      orderDesc: state.list.orderDesc,
				// ...
	    }),
			shallowEqual
	  )

	const {
		handlePagination,
		// ...
  } = usePagenation()
	
	return (
		<div>
			<div>{page}</div>
			<button onClick={() => handlePagination({ page, searchTerm, orderDesc, ...  })}>
				next page
			</button>
		</div>
	)

}
```

# Proposal

## 1. component와 custom hook이 각자 역할에만 충실하고 명확해야 한다.

- React는 UI library 그 이상도 이하도 아니다. 즉, component 자체는 state를 감지하고 그려주는 역할로만 사용하면 된다.
- custom hook을 하나의 함수이자 메서드로 생각하고, 불필요한 리렌더링이나 사이드 이펙트가 일어나지 않도록 dependency 없이 순수하게 구축한다.
    - 여기서 custom hook이라는 용어자체가 모호해질 수 있다. 하나의 hook으로 보기보다는 메서드가 결합된 하나의 객체이자 함수로 보는 것이 더 옳지 않을까 싶다.
- 너무나 당연한 말이지만 component 및 custom hook이 가독성, 유지보수성 뿐만 아니라, 비효율적인 처리가 이뤄지지 않도록 명확하게 분리되고 설계되어야 한다. (refactoring 책 참고)
- 물론, React.memo, useCallback 등 memoization을 적절히 사용하는 것은 기본이다.

## 2. useStore의 활용

- 지금까지 위에서 언급한 문제를 해결할 수 있는 방법 중 하나가 useStore의 활용이다.
- custom hook에서는 필요하지만 **component는 불필요한 state**를 그 어디에도 담지 못할 때, useStore를 활용해서 해결할 수 있다. 
    - 해당 state를 custom hook or component 어디에든 존잰하면 re-render가 발생한다.
- [codeSandBox 예제](https://codesandbox.io/s/quirky-pine-spzgyk?file=/src/index.js](https://codesandbox.io/s/quirky-pine-spzgyk?file=/src/index.js)

### A. custom hook 안에서 useStore의 활용

- 가장 먼저 떠올릴 수 있는 케이스로, 범용성 및 가독성, 유지보수성에서 좋은 방법일 수 있을 것 같다.
- 하지만 엄밀히 따지면 해당 메서드가 순수하지 못한다는 단점이 있다.

```jsx
const usePagenation = () => {
	const store = useStore();
	
	const handlePagination = useCallback(() => {
		const params = { page: store.getState().list.page, ... }
		// fetctList(params)
		// ...
	}, [])
	
	// ...

}
```

### B. component 안에서 useStore의 활용

- 메서드가 순수해질 수는 있으나, 매 component에서 useStore 및 parameter를 구현해야한다는 점에서 A보다는 범용성 및 가독성, 유지보수성이 떨어질 수도 있다.

```jsx
const ListFooter = () => {
	const store = useStore();
	const { page } = useSelector(state => ({ page: state.list.page }),
		shallowEqual
	)

	const {
		handlePagination,
		// ...
  } = usePagenation()
	
	return (
		<div>
			<div>{page}</div>
			<button onClick={() => handlePagination({
				page, searchTerm: store.getState().list.searchTerm, ...
			})}>
				next page
			</button>
		</div>
	)

}
```

## 3. state management를 적극 활용하자.

- **가장 중요한 이야기일 수도 있다. useStore는 어디까지나 위의 케이스처럼 특별한 경우에만 쓰는 것을 추천하며, 기본적으로 useSelector나 useState 등을 적극 활용할 수 있으면 한다.**
- 또한, api 비즈니스 로직을 제외하면 위와 같은 경우는 component 및 custom hook을 역할별로 잘 쪼게었다면 자주 보여지는 경우는 아니다.
- api 비즈니스 로직은 redux의 경우는 thunk, saga 등을 통해서 분리하여 관리하면 custom hook과 component가 보다 깔끔해질 수 있다. (optional)
- 이하 예시는 위의 케이스와 다른 ListFooter에서 searchTerm state가 필요한 상황

```jsx
const ListFooter = () => {
	const { page, searchTerm } = useSelector(state => ({
			page: state.list.page
			searchTerm: state.list.searchTerm
		}),
		shallowEqual
	)

	const {
		handlePagination,
		// ...
  } = usePagenation()
	
	return (
		<div>
			<input value={searchTerm} />
			<div>{page}</div>
			<button onClick={() => handlePagination({
				page, searchTerm
			})}>
				next page
			</button>
		</div>
	)

}
```

### (Optional) component 속에 custom hook 녹여내기.

- 애초에 custom hook을 구상했던 시초는 범용성 및 가독성, 유지보수성 뿐만 아니라, react의 역할에 초점을 두고 싶었기 때문이다.
- container 구조에서 무의한 props drilling은 component의 비효율 및 가독성, 유지보수성을 현저히 떨어뜨렸다.
- 또한, 서비스의 구조나 기능이 변경, 추가, 제거, 확장 등이 될 때마다 container 및 component의 구분이 애매모호해졌다. (container 밑에 container가 있거나, 그 밑 component 밑에 갑자기 container가 추가되거나 등)
- 결국 모든 component가 독립적으로 각자의 역할을 수행하는 하나의 functional component(container) 형태가 시발점이었다.
- 또한, 각각의 component를 모으는 page나 component가 존재할 수는 있겠지만, 해당 component가 자식 component의 state나 로직들을 다 품는 container 구조는 아니었다.
- 하지만 React component에서 UI를 그리는 일 외에 다른 일을 한다는 것이 개인적으로 마음이 너무 불편했고,
- UI는 component에서, 내부로직은 container에서만 보면 된다는 container의 유지보수 장점이 그리워졌다.
- 그래서 custom hook이라는 곳에 로직을 담고, component는 UI를 그리는 용도로만 설계하여, 범용성 및 가독성 및 유지보수성을 올리려하였다.
- 당장은 이하 ListFooter component가 보기 편할지 모르겠지만, 메서드가 수십개가 되고, DOM elements, styled-component들이 덕지덕지 붙으면 custom hook이 그리워지지 않을까 생각이 든다.

```jsx
const ListFooter = () => {
	const store = useStore();
	const { page } = useSelector(state => ({ page: state.list.page }),
		shallowEqual
	)

	const handlePagination = useCallback(() => {
		const params = { page: store.getState().list.page, ... }
		// fetctList(params)
		// ...
	}, [])
	
	return (
		<div>
			<div>{page}</div>
			<button onClick={handlePagination}>
				next page
			</button>
		</div>
	)

}
```

# Reference

- [react api reference](https://ko.reactjs.org/docs/react-api.html)
- [react-hooks](https://ko.reactjs.org/docs/hooks-intro.html)
- [react advanced guides](https://reactjs.org/docs/optimizing-performance.html)
- [react-redux](https://react-redux.js.org/)
- [vlpt의 useSelector](https://react.vlpt.us/redux/08-optimize-useSelector.html)