## useEffect 를 통한 API 호출의 문제
### 2021-04-07
### Status
*Accepted*

### Context
* hooks 를 사용하는 중 useEffect 에서 state 변화를 감지하여 API 를 호출할 때 에러 핸들링에서 문제가 발생
```
useEffect(() => {
 // something API call (API call duplicate)
}, [state])
```
* 위 경우 state 는 이미 변경되어 있음. 하지만, API call 과정에서 문제가 발생하면 try/catch 구문 중 catch 에서 해당 state 를 강제로 이전 값으로 돌려야 하는 문제가 발생
* 아래의 구조를 제안하고 의견을 듣고자 함
> 제안 된 구조: event => call API => change state(useEffect 에서 API 호출을 지양)

### Decision
* 위에서 제안 된 해결책을 사용하기로 결정
* 이유
1. useEffect 에서 state 를 감지하여 변경하는 과정에서 불필요하게 usePrevious 와 같은 커스텀 훅이 필요
2. useEffect 에서 try catch 를 빼먹는 경우 제어할 수 없는 상황이 발생(개발자가 인지하지 못하는 부작용)
3. 제안 된 구조의 가장 큰 단점인 props 의 사이즈가 거대해진다는 문제가 있음에도 불구하고 모든 케이스를 제어하는 것이 더 중요하므로 제안 된 구조를 적용하기로 함
4. 오히려 props 이 명확하게 보이므로 가독성이 좋아지는 장점이 있음 다만 코드가 지저분해지는 단점도 공존

### Consequences
* 앞으로 개발 시 이벤트 핸들링은 위와 같은 형태로 진행
* 기존의 useEffect 를 활용하여 개발된 사항은 점진적으로 리팩토링 수행

### References
* 없음.