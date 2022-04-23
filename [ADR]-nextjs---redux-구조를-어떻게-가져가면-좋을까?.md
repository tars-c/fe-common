## nextjs + redux 구조를 어떻게 가져가면 좋을까?
### 2021-04-07
### Status
*Accepted*

### Context
* nextjs 에 redux 를 적용하는 과정에서 새로운 폴더 구조를 적용 해야 하는 상황 발생
* components 로 모아 두었을 때 이름이 겹치는 문제가 자주 발생 그로 인해 불필요한 prefix, suffix 등이 발생
* 새로운 feature 추가 시에 container, components 파일을 찾기가 힘듦
```
// Old Structure
src
| - Component
| - Container
| - modules
| - common
```

```
// New Structure
src
| - common
| - feature
  | - component
  | - container
  | - modules
    | - stroe
    | - api
| - 기타 설정파일
```

### Decision
* 새로운 구조를 적용하기로 결정
* 이유
1. 기존 구조보다 신규 구조가 파일 명명하기 편리
2. feature 단위로 구조를 가져갈 경우 신규 feature 추가 시 폴더 간의 의존성이 없으므로 작업하기 편리(공통 모듈에 추가하는 정도)

### Consequences
* 우선은 CLUE에서 먼저 적용

### References
* 없음.