## 릴리즈 버전 관리 프로세스 통일 및 자동화

### 2021-12-22

### Status
Accepted

### Context
- 릴리즈 버전 관리에 대한 프로세스 통일 및 자동화의 필요성 증가
    - 구성하는 프로젝트 개수가 점차 증가
    - 프로젝트의 잦은 배포
    - 각 버전의 변경 사항을 수동으로 정리

- 다음을 활용한 버전 관리 프로세스의 통일 및 자동화 논의
    - git tag : commit을 참조하기 위한 이름
    - CHANGELOG.md : 프로젝트 변경 이력 관리 문서
    - standard-version : 프로젝트의 버전을 자동으로 관리하기 위해 사용하는 패키지
- 버전 관리는 유의적 버전 관리 명세를 따름
- `.versionrc` 를 통한 CHANGELOG.md 명시 기준은 linewalks에서 사용 중인 [commit type](https://github.com/linewalks/dev-common/wiki/Commit-%EA%B0%80%EC%9D%B4%EB%93%9C)을 활용

### Decision

#### 🛠 standard-version 설정

1. standard-version 설치

```bash
yarn add -D standard-version
```

2. 스크립트 명령어 추가
```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```
3. `.versionrc` 설정 파일 추가 - [하단 참고](https://github.com/linewalks/fe-common/wiki/%5BADR%5D-%EB%A6%B4%EB%A6%AC%EC%A6%88-%EB%B2%84%EC%A0%84-%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%ED%86%B5%EC%9D%BC-%EB%B0%8F-%EC%9E%90%EB%8F%99%ED%99%94-%EB%85%BC%EC%9D%98#versionrc-%EA%B5%AC%EC%84%B1)

#### ✅ 버전 등록
0. main branch가 최신화 되어있는지 확인
    - git pull origin
1. release branch 구성
    - `git checkout -b feat.{version}` e.g) git checkout -b feat.v0.0.5
2. 구성할 버전에 반영할 빌드 파일이 최신화되었는지 확인
3. release commit 생성
    - `yarn release` -> 버전 commit, git tag 생성, CHANGELOG.md 업데이트
```bash
first release
> yarn release --first-release

custom version
> yarn release -- --release-as <custom_version>

minor, alpha, prerelease 버전 등은 standard-version 패키지 github 참고
```
4. release commit 저장
    - `git push origin feat.{version}` e.g) git push origin feat.v0.0.5
5. remote에 git tag 반영
    - `git push --follow-tags origin {version}` e.g) git push --follow-tags origin v0.0.5
6. 프로젝트 홈페이지에서 feat.{version} base branch main 으로 하여 PR 생성
    - 제목: {version} release
    - 내용: CHANGELOG 에 있는 정보 모두
    - e.g: https://github.com/linewalks/lwds/pull/77
7. 병합
8. main 브랜치에서 `git pull origin main`

#### commit 형식
- 자동 CHANGELOG.md 구성을 위한 commit 형식
   - `<타입>[적용 범위(선택 사항)]: <설명>`  e.g) feat(admin): update admin permission
   - `:` 위치 주의 ⚠(띄어쓰기 x)
   - 위 예시에 대한 CHANGELOG.md 구성 e.g) **Features** admin: update admin permission(ac94023)

#### `.versionrc` 구성
standard-version에서 CHANGELOG.md 를 commit을 통해 자동으로 구성할 때 사용하는 설정

```json
{
  "types": [
    { "type": "chore", "section": "Others", "hidden": true },
    { "type": "feat", "section": "Features", "hidden": false },
    { "type": "fix", "section": "Bug Fixes", "hidden": false },
    { "type": "improvement", "section": "Feature Improvements", "hidden": true },
    { "type": "docs", "section": "Docs", "hidden": false },
    { "type": "style", "section": "Styling", "hidden": true },
    { "type": "refactor", "section": "Code Refactoring", "hidden": true },
    { "type": "test", "section": "Tests", "hidden": true },
    { "type": "package", "section": "Packages", "hidden": true }
  ]
}
```

### Consequence
- 도입 결정
- 모든 프로젝트에 대해 CHANGELOG.md 관리 필수적 (릴리즈 노트 역할)
- 추후 버전 관리 방법 및 commit 관리 내용 개선 필요

### Reference
- [유의적 버전 관리 명세](https://semver.org/lang/ko/)
- [Changelog.md](https://Changelog.md)
- [standard-version 패키지](https://github.com/conventional-changelog/standard-version)
- [GitHub 변경 사항을 자동으로 log로 만들고 release 하기](https://musma.github.io/2020/07/27/changelog.html)
