- 2021.07.14 FE 기술회의를 기반으로 다음의 규칙을 정함.

### HTML

- id / class 네이밍 규칙
    - 단어의 나열은 snake_case 로 작성한다 // ex. criteria_list
- role 네이밍 규칙
    - 단어의 나열은 kebab-case 로 작성한다 // ex. item-button

- semantic tag 지향
  - header: 헤더를 의미
  - footer: 푸터를 의미
  - nav: 네비게이션 구획을 의미
  - aside: 사이드 구획을 의미
  - section: 문서의 독립적인 구획을 의미 (논리적인 의미가 강함)
  - article: 사이트 안에서 독립적으로 구분해 배포하거나 재사용할 수 있는 구획을 의미
	* section과 article을 누가 우위를 점하는 것이 아님 article 안에 section 이 존재할 수 있고, section 안에 article이 존재할 수 있음
  - main: body의 주요 정보를 포함하는 구획을 의미 
	* main은 문서에서 꼭 하나만 존재해야 함.

### CSS
- 속성 선언 순서
  1. 레이아웃: display, visibility, overflow, float, clear, position, top, right, bottom, left, zindex,
  2. box: width, height, margin, padding, border
  3. 배경: background
  4. 폰트: font,color, letter-spacing, text-align, text-decoration, text-indent, verticalalign, white-space
  5. 기타: 위에 언급되지 않은 나머지 속성들로 폰트의 관련 속성 이후에 선언하며, 기타
    * 중요! 속성 내의 선언 순서는 무관함
    * [속성 선언 순서 기준: 1: 레이아웃, 2: box, 3: 배경, 4: 폰트, 5: 기타]

- padding, margin 값에 한해서 축약을 적용
   - padding: 20px 20px 20px 20px -> padding: 20px // 모두 동일한 경우
   - margin: 0 auto 0 auto -> margin: 0 auto // 상하/좌우가 동일한 경우
   - padding: 20px 30px 50px 30px -> padding:20px 30px 50px // 좌우가 동일한 경우

### reference
- [nhn markup 코딩 컨벤션](https://www.notion.so/Linewalks-markup-convention-47b9f97b3cc041f981ea838f81ac26b7#5abd530e3eef49c89c9424cf8c966d04)