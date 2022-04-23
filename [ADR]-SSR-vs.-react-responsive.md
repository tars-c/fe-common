## SSR vs. react-responsive
### 2021-04-07
### Status
*Accepted*

### Context
* react-responsive 의 media query 사용 시 서버사이드에서 항상 false 리턴 하여 정상적으로 media query 적용되지 않음
```
const isServer = typeof window === undefined
(!isServer && (<Component {...pageProps} />)
```
* 위 방식을 현재 사용하는데 이 방법으로 진행해도 좋은지 의견을 듣고 싶어 제안
* 해결책으로 제시된 사항은 4 가지가 있음
1. css 만을 활용하여 구현
2. 다른 라이브러리(server-rendering-responsively) 사용
3. SSR 을 포기
4. 위에서 제시 된 해결책 사용

### Decision
* 위에서 제시 된 해결책을 사용하기로 결정
* 이유
1. 1안은 현재 변경을 하기에는 수정사항이 굉장히 많음
2. 2안은 server-rendering-responsively가 정상적으로 package 등록도 되어있지 않고, 사용하기 불안함
3. 3안은 대부분 이용자가 PC화면을 이용할 것으로 예상. 초기 로딩 데이터가 많아 SSR 이용하는 것이 효율적
4. nextjs 에서도 명확한 해결책이 따로 없는 시점이고, 렌더링 시점을 살짝 변경하는 것이므로 크게 부담이 없음
5. 기존의 Data fetching 작업은 정상적으로 이루어지기 때문에 이 과정도 문제 없음

### Consequences
* 현재 media query 에 의존적인 프로젝트는 punchbox 만 존재하므로 당장은 punchbox 만 적용
* 그 외 프로젝트 및 신규 프로젝트의 경우 해당 이슈 발생 시 위에 제시 된 해결책을 사용

### References
* [medium ssr vs responsive](https://medium.com/@houwei.shen/react-02-ssr-vs-responsive-design-f6a90e58c669)