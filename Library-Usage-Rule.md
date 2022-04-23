# 라이브러리 사용 규칙

## clsx
- 다수의 className을 입력할 때 항상 clsx 사용

```js
<Component
  className={clsx('class1', 'class2')}
/>
<Component
  className="onlyclass"
/>
```

## inline style 사용 제약
- (className 제외한) `style 속성이 3개 이상` 시 styled component로 구현
- 3개 이하 경우에도 목적에 따라 styled component를 활용할 수 있다.

```js
// Don't
<div
  style={{
    width: 80,
    height: 80,
    margin: 0
  }}
/>

// Do
import styled from 'styled-components'
const StyledDiv = styled.div`
  width: 80;
  height: 80;
  margin: 0
`
<StyledDiv />


```

