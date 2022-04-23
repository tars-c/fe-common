## 설치
1. vscode를 먼저 설치 한다. (https://code.visualstudio.com/)
2. vscode 설치후 좌측 Extensions 으로 진입`(win. ctl + shift + X, mac. cmd + shift + X)`
3. prettier 검색 후 `Prettier - Code formatter` 설치
4. vscode (`win. ctrl + shift + P, mac. cmd + shift + P`) 키 입력 후 `settings`를 검색한다.
5. `Preferences: Open Settings (JSON)` 을 선택한다.
6. settings.json 파일 아래 내용을 붙여넣는다. (만약 prettier 를 파일로 따로 설정하고 싶다면 그렇게 해도 좋다.)
- Editor 설정
```
  "editor.defaultFormatter": "esbenp.prettier-vscode", // default formatter를 prettier로 설정합니다.
  "editor.tabSize": 2,
  "editor.detectIndentation": false, // tab size 설정을 위해 false 처리(true면 insert space, tab size 가 무시됨)
  "editor.renderWhitespace": "all", // 공백이 들어가 있는지 여부를 명확히 보기 위해 all로 체크(설정 시 공백이 .으로 보임)
  "editor.tokenColorCustomizations": {
    "comments": "#ffc2c2" // editor의 주석 색상을 정해주는 것인데 본인이 편한 색상으로 지정하자.
  },
  "editor.wordWrap": "on", // 자동 줄바꿈 기능으로 on인 경우는 무조건 줄바꿈, bounded는 정해진 글자 수에 맞춰서 줄바꿈
  "editor.formatOnSave": true, // 설정하면 저장 시 format에 맞게 자동으로 변환 후 저장 된다.
```
- Prettier 설정
```
  "prettier.trailingComma": "all", // 뒤따르는 , 를 자동으로 입력해준다.
  "prettier.packageManager": "yarn", // yarn을 사용하므로 yarn으로 정의
  "prettier.singleQuote": true, // 기본적으로 single quote를 사용.
  "prettier.semi": false, // 현재 우리 프로젝트는 semi를 마지막에 사용안하므로 해제
  "typescript.preferences.quoteStyle": "single", // quoteStyle 정의 single 을 기준으로 사용하므로 설정
  "javascript.preferences.quoteStyle": "single", // quoteStyle 정의 single 을 기준으로 사용하므로 설정
```
> 프로젝트 구성에 따라 .prettier.json 등의 형태로 추출하여 사용 가능합니다.
- ESLint 설정
    - 프로젝트 구성 시 ESLint 설정을 수행합니다.
    - [[Editor] ESLint 설정](https://github.com/linewalks/fe-common/wiki/%5BBasic-Settings%5D-ESLint)

## 아래는 기타 vscode의 extension입니다. 취향에 따라 설치해서 사용하시면 좋습니다.
### Rename Tag
![image](https://user-images.githubusercontent.com/62513024/136882642-d5329d3b-3831-4fa0-a920-421ddd32e237.png)
- html tag를 수정할 때 여는(닫는) 태그명 수정 시 자동으로 닫는(여는) 태그를 수정해줍니다.

### Bracket Pair Colorizer
![image](https://user-images.githubusercontent.com/62513024/136882678-8929492a-dfb0-4142-a59f-cc64ac63a81c.png)
- bracket을 눈에 띄는 색상으로 설정해줍니다.

### Indent-Rainbow
![image](https://user-images.githubusercontent.com/62513024/136882713-91edcd07-580c-49ba-b23b-42f47f9077fc.png)
- 들여쓰기의 색상을 다르게 하여 들여쓰기가 적용된 현황을 파악하기 쉽게 해줍니다.

### vscode-styled-components
![image](https://user-images.githubusercontent.com/62513024/136882731-e02e00e6-3eca-4370-9602-71e81e51bed7.png)
- styled-components의 syntex 하이라이팅 기능입니다.

### Color Highlight
![image](https://user-images.githubusercontent.com/62513024/136882764-2f780fce-600d-40cb-9a3c-254e6e9f0523.png)
- css/web에서 색상을 바로 확인할 수 있습니다.   

### Path Intellisense
![image](https://user-images.githubusercontent.com/62513024/136882783-918f78f2-3975-4f8f-8f23-70e3ff4456cd.png)
- 경로를 작성할 때 쉽게 작성할 수 있게 도와줍니다. 

### Path Autocomplete
![image](https://user-images.githubusercontent.com/62513024/136882799-f5561cad-d635-426b-ae12-0f7f4ecaf753.png)
- 경로 설정 시 도움을 줍니다. 상대경로에  한정되서 사용됩니다.

### ESLint
![image](https://user-images.githubusercontent.com/62513024/136882810-0a6ebe49-0a8b-40ee-a9b7-6b1c8e2626a2.png)
- 린트를 적용하여 규칙에 맞는 코드 작성을 도와줍니다.