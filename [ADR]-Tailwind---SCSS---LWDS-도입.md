## Tailwind - LWDS 도입
### 2021-10-13
### Status
*Accepted*

### Context
* 기존 Styled component로 작성된 MDwalksUI의 컴포넌트를 가져와 커스터마이징을 할 때의 불편함이 대두됨
  * Wrapper를 별도로 만들거나 해당 Selector의 property의 값에 직접 `!important`를 넣어야 했음

### Decision
* Tailwind + SCSS 도입안 검토
* 인라인으로 tailwind 코드 작성시 가독성이 떨어진다는 불편함이 있어, 스타일링 하려는 컴포넌트의 class를 선언 후 별도의 scss파일에 스타일 코드 작성.

예시)
```js
// button.js
 import "button.scss";

<button className=".blue-button">
  버튼입니다
</button>
```

```css
/* button.scss */
.blue-button {
  @apply bg-blue-500 p-4 text-white rounded  //스타일이 너무 길어질 시 개행
  hover:bg-blue-700 hover:shadow-xl;
}
```
 

### Consequences
* LWDS 개발 시 도입하기로 결정

### References
* [tailwind 도입 검토 (google docs)](https://docs.google.com/document/d/1EE49oNiNYUAjQQpHegQQevK3QZyeaFN4W-r86k9hvro/edit)
* [tailwind config 설정 팁](https://www.viget.com/articles/tips-for-your-tailwind-config/)
* [tailwind-merge (tailwind로 이미 선언/적용된 class를 다른 class로 override 할 경우 유용한 라이브러리)](https://github.com/dcastil/tailwind-merge)