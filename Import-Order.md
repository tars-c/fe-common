## Import Order

용어 정의
```js
import A, { B, C } from 'ZZZ'
import A, { B, C } from '@aaa/bbb/ccc'
```
- A: default
- { B, C }: destructuring
- ZZZ: module

- aaa: feature
- bbb: directory
- ccc: file

## 기본 순서
 - `react → 외부 → 내부` 3가지 파트 순으로 나눔

### react
- 항상 처음에 옴

### 외부

- default 이름 기준 오름차순(특수문자 > 알파벳)
- destructuring으로만 이루어진 경우, 뒤로
  - module 이름 기준 오름차순

### 내부

- 최상위 `@app, @common`
- 그 이후는 feature 이름 기준 오름차순
- 같은 feature 내 directory 정렬 순서
  - modules
  - containers
  - components
  - helpers
- directory내 import는 알파벳순

```js
// react
import React, { useState, useEffect } from 'react'
// 외부
import _ from 'lodash'
import aaa from 'aaa'
import bbb from 'bbb'
import eee, { ggg, yyy } from 'eg'
import xxx from 'xxx'

import { ttt } from 'abc/def'
import { ABC, DEF } from 'fff'
import { Button, EmptyPlaceHolder, Modal } from 'MDwalks-UI'
import { aaaaa } from 'zzz'

// 내부
// @app, @common
import HOSTNAME from '@app/config'
import { callWithToken } from '@common/helpers/utils/common'

// feature
// modules, containers, components, helpers
import rootReducer from '@featureA/modules/store'
import { initListResult } from '@featureA/modules/store/cohort_list/listResult'
import CohortListContainer from '@featureA/container/cohort_list/CohortListContainer'
import ResultChartTooltipContent from '@featureA/components/analysis/adverse_event/ResultChartTooltipContent'
import { someHelper } from '@featureA/helpers/some'
```