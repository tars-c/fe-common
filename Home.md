*Welcome to the fe-common wiki!*

## Basic Settings
- [VSCode](https://github.com/linewalks/fe-common/wiki/%5BBasic-Settings%5D-VSCode)
- [Oh my zsh](https://github.com/linewalks/fe-common/wiki/%5BBasic-Settings%5D-Oh-my-zsh)
- [ESLint](https://github.com/linewalks/fe-common/wiki/%5BBasic-Settings%5D-ESLint)


## Code Convention
- [Project Directory Structure](https://github.com/linewalks/fe-common/wiki/Project-Directory-Structure)
- [Import Order](https://github.com/linewalks/fe-common/wiki/Import-Order)
- [Library Usage Rule](https://github.com/linewalks/fe-common/wiki/Library-Usage-Rule)
- [Props Usage Order Rule](https://github.com/linewalks/fe-common/wiki/Props-Usage-Order-Rule)

## Naming Convention
- [Naming Convention](https://github.com/linewalks/fe-common/wiki/Naming-Convention)
## Markup Convention
- [Markup Convention](https://github.com/linewalks/fe-common/wiki/Linewalks-markup-convention)


## ADRs
* 최신이 위로
- [[Accepted] 비효율적인 component re-render 현상 개선](https://github.com/linewalks/fe-common/wiki/%5B%08ADR%5D-%EB%B9%84%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-component-re-render-%ED%98%84%EC%83%81-%EA%B0%9C%EC%84%A0)
  - 비효율적인 re-render 현상의 원인을 파악하고, 구조 개선 및 useStore 등을 통하여 re-render 방지 논의

- [[Proposed] useSelect와 Redux Store 업데이트로 인한 불필요한 리렌더링 개선](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-useSelect%EC%99%80-Redux-Store-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A1%9C-%EC%9D%B8%ED%95%9C-%EB%B6%88%ED%95%84%EC%9A%94%ED%95%9C-%EB%A6%AC%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B0%9C%EC%84%A0)
  - redux 스토어 구독으로 인한 리렌더링 문제 개선 논의

- [[Accepted] useCallback과 ref props를 통한 DOMElement 참조 방법 개선](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-useCallback%EA%B3%BC-ref-props%EB%A5%BC-%ED%86%B5%ED%95%9C-DOMElement-%EC%B0%B8%EC%A1%B0-%EB%B0%A9%EB%B2%95-%EA%B0%9C%EC%84%A0)
  - useEffect와 useRef를 사용한 DOMElement 참조 로직 개선 논의

- [[Accepted] 릴리즈 버전 관리 프로세스 통일 및 자동화 논의](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-%EB%A6%B4%EB%A6%AC%EC%A6%88-%EB%B2%84%EC%A0%84-%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%ED%86%B5%EC%9D%BC-%EB%B0%8F-%EC%9E%90%EB%8F%99%ED%99%94-%EB%85%BC%EC%9D%98)
  - standard-version과 CHANGELOG.md 를 통한 버전 관리 프로세스 도입 논의

- [[Accepted] MicroFrontend 아키텍처 도입](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-MicroFrontend-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%EB%8F%84%EC%9E%85)
  - MSA 기반의 MicroFrontEnd 아키텍처 도입 논의

- [[Accepted] component & custom hook architecture ](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-component-&-custom-hook-architecture)
  - container 구분 없는 독립적인 component 단위의 새로운 구조 도입 논의

- [[Accepted] Tailwind + SCSS -> LWDS 도입](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-Tailwind---SCSS---LWDS-%EB%8F%84%EC%9E%85)
  - Styled component를 대체할 Tailwind + SCSS 도입 필요성 논의

- [[Accepted] border vs. box-shadow](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-border-vs.-box-shadow)
  - box-shadow가 border의 역할을 대체해야 하는 경우 논의

- [[Accepted] className 관련 라이브러리(clsx) 사용 룰](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-className-%EA%B4%80%EB%A0%A8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC(clsx)-%EC%82%AC%EC%9A%A9-%EB%A3%B0)
  - 효율적인 className 관리를 위한 clsx 라이브러리 사용 규칙 논의

- [[Canceled~Accepted~] Component vs. Container](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-Component-vs.-Container)
  - 애매하게 나눠진 Container 와 Component 의 역할 정의를 위한 논의

- [[Accepted] nextjs redux 구조를 어떻게 가져가면 좋을까?](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-nextjs---redux-%EA%B5%AC%EC%A1%B0%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B0%80%EC%A0%B8%EA%B0%80%EB%A9%B4-%EC%A2%8B%EC%9D%84%EA%B9%8C%3F)
  - 보다 효율적으로 feature 개발을 위한 구조 논의

- [[Rejected] redux action 의 네이밍 룰](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-redux-action-%EC%9D%98-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EB%A3%B0)
  - store 내부에 공통되는 이름이 발생하는 문제에 대한 논의

- [[Accepted] useEffect 를 통한 API 호출의 문제](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-useEffect-%EB%A5%BC-%ED%86%B5%ED%95%9C-API-%ED%98%B8%EC%B6%9C%EC%9D%98-%EB%AC%B8%EC%A0%9C)
  - useEffect 를 사용하여 state 변화 감지 후 API 를 호출하는 경우 에러 핸들링 이슈에 대한 논의

- [[Accepted] SSR vs. react-responsive](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-SSR-vs.-react-responsive)
  - SSR 과 react-responsive 같이 사용하는 경우 media query 가 정상적으로 동작하지 않는 문제에 대한 해결책 논의

