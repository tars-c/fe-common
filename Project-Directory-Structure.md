## Project Directory Structure 프로젝트 폴더 구조
### CLUE를 제외한 프로젝트
* 기능별로 상위 폴더를 분리하고 다음을 포함한다.
  * `components`: 디자인 요소 위주, state를 지양
  * `containers`: 로직 수행, 디자인 요소 제외
  * `helpers`: 함수
  * `modules`: redux
* 여러 기능에서 공통으로 사용 될 수 있는 요소는 `common` 폴더에 포함시킨다.
* 유닛 테스트 용도의 폴더는 각 폴더마다 존재한다.
  * `__test__`: 테스트 코드
  * `__mocks__`: 테스트 중 필요한 mock data 정의


```
common - 공통으로 사용할 수 있는 요소
  ㄴcomponents
    ㄴ__tests__
    ㄴ__mocks__
  ㄴcontainers
  ㄴhelpers
  ㄴmodules
{feature} - 기능별
  ㄴcomponents
    ㄴ__tests__
    ㄴ__mocks__
  ㄴcontainers
  ㄴhelpers
  ㄴmodules
pages - 페이지 (next.js)
__tests__ - 페이지에 대한 테스트
__mocks__ - 페이지 대한 테스트에 필요한 mock data

```

### CLUE 신규 구조
* 기능별로 상위 폴더를 분리하고 다음을 포함한다.
  * `components`: 각 기능별 독립적인 단위로 component 구성
  * `hooks`: state 관리, 로직 수행 등 (optional)
  * `helpers`: 함수
  * `modules`: redux
* 여러 기능에서 공통으로 사용 될 수 있는 요소는 `common` 폴더에 포함시킨다.
* 유닛 테스트 용도의 폴더는 각 폴더마다 존재한다.
  * `__test__`: 테스트 코드
  * `__mocks__`: 테스트 중 필요한 mock data 정의


```
common - 공통으로 사용할 수 있는 요소
  ㄴ__tests__
  ㄴ__mocks__
  ㄴcomponents
  ㄴhooks
  ㄴhelpers
  ㄴmodules
{feature} - 기능별
  ㄴ__tests__
  ㄴ__mocks__
  ㄴcomponents
  ㄴhooks
  ㄴhelpers
  ㄴmodules
pages - 페이지 (next.js)
__tests__ - 페이지에 대한 테스트
__mocks__ - 페이지 대한 테스트에 필요한 mock data

```
