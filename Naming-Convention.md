## Constant Naming
 - `PAGE_LENGTH`와 같이 대문자 스네이크 케이스를 사용한다.

## Component key Naming
 - `component__index`와 같이 component 이름과 index를 활용한다. (언더바 2개)
 - 해당 key가 중복되는 경우 `component__index__name`와 같이 특정 구분값을 추가한다.

## Event Handler Naming

- props의 경우 on~~
- function의 경우 handle~~

```js
const Component = ({
  onYesClick
  onClose
}) => {
  const handleCloseBtnClick = () => {
    DoSomething()
    onClose()
  }

  return (
    <>
      // props 그대로 전달
      <Button onClick={onYesClick} />
      // 감싸서 전달
      <Button onClick={handleCloseBtnClick} />
    </>
  )
}
```