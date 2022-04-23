## redux action 의 네이밍 룰
### 2021-04-07
### Status
*Rejected*

### Context
* 하나의 feature 내에 동일한 action 명을 가진 경우가 존재
* 현재는 `@feature/ACTION_NAME` 형태
* 명확하게 구분을 하기 위해 `@feature/directory/ACTION_NAME` 을 제안

### Decision
* 기존 구조를 유지하기로 결정
* 이유
1. 이전 구조가 보다 명확. dir 를 추가하는 경우 구조가 복잡해짐
2. 이런 상황이 자주 발생하는 가를 먼저 파악하는게 우선

### Consequences
* 기존의 방식으로 구현 진행

### References
* 없음.