## CSS: border vs. box-shadow
### 2021-07-14
### Status
*Accepted*

### Context
* border 값이 있는 컴포넌트가 focus/active/error등의 상태에 따라 밀림 현상이 발견
* 제플린 시안에 CSS의 특성이 적용되지 않으면서 발생된 문제

* 현행
  * 상태에 따라 border: 1px -> 2px로 변하게 되면서 근방의 컴포넌트에 영향을 끼침
  * 예시 코드 및 이미지
```css
const WrapInputBox = styled.div`
  .
  .
  .
  border: 1px solid ${color.$grey05};
  &:focus-within {
    border: 2px solid ${color.$pmblue};
    box-shadow: 0 2px 18px 0 rgba(109, 120, 132, 0.28),
  }
`
```
![](https://images.velog.io/images/goodlana/post/e4ea90e9-5e4f-48e7-b1ce-246adc56dadf/boder%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC.gif)

* 제안
  * 컴포넌트 상태에 따라 border 처리를 달리 해야하는 경우, box-shadow의 multi-line을 사용
  * box-shadow를 다중(multi)으로 사용하는 경우, border로 사용하는 값이 제일 먼저 위치해야 함
  * 예시 코드 및 이미지

```css
const WrapInputBox = styled.div`
  .
  .
  .
  box-shadow: 0px 0px 0px 1px ${color.$grey05};
  &:focus-within {
    box-shadow: 0px 0px 0px 2px ${color.$pmblue}, /* 쉼표(,)로 다중 처리가 가능하며, border로 사용하는 값이 앞에 위치해야 한다. */
      0 2px 18px 0 rgba(109, 120, 132, 0.28); /* 실제 shadow 역할을 하는 값*/
  }
`
```
![](https://images.velog.io/images/goodlana/post/73760df0-899d-4db1-9656-fadf6dc4b3e0/box-shadow%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC.gif)



### Decision
* 제안안을 따르기로 결정.
* 이유
  1. box-shadow가 border를 100% 대체하게 된다면 이에 따른 문제도 수반될 것
  2. 설령 문제가 파생되지 않는다 하더라도, HTML 시맨틱 구조를 따라야 함

### Consequences
* border 값이 정적인 경우: border 사용
* border 값이 status에 따라 변하는 경우 : box-shadow 사용

### References
* 없음.