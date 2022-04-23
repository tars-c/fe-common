## 2021-05-06

## Status
 - _Accepted_

## Context
 - 보다 효율적이고 유지 보수성(가독성) 좋은 className 관리를 위한 라이브러리 필요성 대두
 - 관련 라이브러리 `clsx` 활용에 따른 사용 규칙 필요

## Decision
 - 타 방식 및 라이브러리 대비 속도면에서 우수한 `clsx` 사용 결정
 - 2개 이상의 className 혹은 별도 js 연산 필요 시에만 `clsx` 사용
   * 1개 혹은 단순 string 타입일 경우 `clsx` 활용 시, 오히려 비효율적임
```js
// ex
className={clsx(fontStyle.fs14, fontStyle.fc_grey10)}
```

## Consequences 
 - 추후 개발 시에 상기 사항 적용
 - 점진적으로 적용이 안 된 기존 프로젝트 리팩토링 시행 예정

## References
 - [clsx - npm](https://www.npmjs.com/package/clsx)
 - [clsx - repo](https://github.com/lukeed/clsx#readme)