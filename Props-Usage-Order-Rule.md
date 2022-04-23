## Props 선언 순서 규칙

### 목적
- props의 value, callback, style 등에 대한 선언 순서 규칙을 통일
- 일정 props 영역은 value 인지 callback 인지 구분을 위해 규칙 설정

### props 전달
- value, callback, style 순서로 전달
- value 를 boolean 값을 위해 단일로 사용하는 요소는 가장 앞에 선언

```jsx
<Component 
  disabled
  name='lee'
  onClick={handleClick}
  style={{ width: '200px' }}
/>
```

### 전달받은 props destructure 선언 순서
- value, callback, style, children, rest 순서로 사용

```jsx
const Component = ({ disabled, name, onClick, style, children, ...rest }) => {}
```


