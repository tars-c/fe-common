## MicroFrontend 아키텍처 도입

### 2021-11-24

### Status
Accepted

### Context
- 프로젝트가 점차 거대해지면서 예상되는 문제점 대두
    - 프로젝트 디렉토리 구조의 거대화
    - 과도한 빌드 시간
    - 테스트 코드의 중복, 종속성 문제
    - 인원 증가에 대한 프로젝트 개발 담당 분할 및 통합 문제

- MSA 기반의 MicroFrontend 아키텍처 도입 논의

### Decision

#### 1안
- Run-time integration
- Udemy 강좌
- 각자 프로젝트에서 js로 build
- 통합 프로젝트에서 merge하는 방법
- 장점
    - 한 페이지 내에서 여러 Repo의 build를 가져올 수 있음
    - 페이지 단위가 아니라, component 단위로 팀이 나누어질 때 유용
    - 다양한 기술 스택 사용 가능 (React, vue 등 js 빌드 가능한 것)
- 단점
    - 통합 프로젝트를 만들어야함
    - 통합 프로젝트 구현이 복잡해짐
        - 인증 등 공통 부분 관리
    - 통합 프로젝트에서 관리하는 것을 각자 프로젝트에서 고려해서 개발하기가 어려움

#### 2안
- Build-time integration
- 각자 프로젝트를 라이브러리 형태로 빌드
- 통합 프로젝트에서 라이브러리를 import해서 사용
- 장점
    - 제일 쉽게 적용 가능?
    - React 렌더링 최적화 full로 이용 가능
- 단점
    - 다양한 기술스택 대응 불가
    - 1안의 단점은 그대로

#### 3안
- 기능별로 각각 나누어서 서비스&배포
- 통합 프로젝트 없음
- Common 모듈을 라이브러리 형태로 제작하여 각자 프로젝트에서 사용
- API Gateway를 이용해 URL에 따라 각자 배포서버로 접속되게
- 사실상 서비스 분리
- 장점
    - 현재 상태에서 URL 기준으로 기능들만 떼어내도 적용 가능
    - React안에서 다양한 기술스택 시도 가능
- 단점
    - 다양한 기술스택 대응하려면 Common 모듈에서 고려해야함
    - Common 모듈 버젼 지속적인 동기화 필요
        - Common이 바뀌었으나 일부가 배포가 안될 경우, 페이지마다 다른 UI가 보인다거나할 수 있음
    - React 렌더링 최적화 이용 불가능 (확인 필요!)

#### 3안으로 가자
- LWDS를 React 기반으로 만들고 있음
    - 개념상 Common 모듈 이미 존재
    - Vue 등 다른 프레임워크는 이미 배제하고 있음
- 백엔드에 도입한 API Gateway(Kong)
    - 도입되어 테스트 및 배포 완료되었음
    - 바로 사용 가능/
- 그 후에 각자 Feature별로 1안 적용 여부 결정

#### 1안 세부 구현 방안
- 독립 구성 가능한 로직과 common 컴포넌트 위주로 우선 분할
- 모듈 통합은 Webpack ModuleFederation Plugin을 통한 RunTime Integration 방식 사용
    - Webpack을 활용한 안정적인 번들러 구성
    - 중복 모듈과 단일 모듈에 대한 효율적인 관리
    - hooks의 자유로운 사용

- 모듈 사용은 Code Splitting을 통한 동적 import 기법을 활용

- NextJS(SSR) 환경에 대한 Webpack 설정 구성 필요


### Example

#### Webpack ModuleFederation Plugin을 통한 MFE 구축 예시

- module export

```javascript
module.exports = {
  devServer: {
    port: 8081,
  },
  output: {
    publicPath: 'http://localhost:8081/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'components',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button', // module export
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '17.0.2' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '17.0.2' },
      },
    }),
  ],
}
```

- module integration
```javascript
module.exports = {
  devServer: {
    port: 8080,
  },
  output: {
    publicPath: 'http://localhost:8080/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'main',
      remotes: {
        components: 'components@http://localhost:8081/remoteEntry.js', // module access
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '17.0.2' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '17.0.2' },
      },
    }),
  ],
}

```

- module import
```javascript
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'

const RemoteButton = lazy(() => import('components/Button')) // load module

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>로딩중...</div>}>
      <RemoteButton>Click Me</RemoteButton>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
)


```

### Consequence

* CLUE에 3안 적용
* Common 모듈 라이브러리화
* 하나씩 떼어내기
* API Gateway 설정

### Reference
- [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)
- [Code Splitting](https://ko.reactjs.org/docs/code-splitting.html)
- [동적으로 모듈 가져오기](https://ko.javascript.info/modules-dynamic-imports)
- [Webpack ModuleFederation Plugin](https://webpack.kr/concepts/module-federation/)
