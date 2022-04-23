# 단방향 통신의 한계와 WebSocket의 등장

- socket 이전에는 HTTP 단방향 통신의 한계점을 극복하기 위해 `Polling`, `Long Polling`, `Streaming` 등의 방법을 활용하였습니다.
- 하지만 이러한 방식은 몇 가지 한계점이 존재합니다.
 - HTTP 헤더를 전송해 전체 파일 크기가 커진다.
 - 클라이언트 혹은 서버 중 한쪽이 완료될 때까지 기다려야 하는 반이중 통신 방식. (완전한 양방향 통신이 아니다.)
 - 서버의 많은 자원을 소모한다.

- 이를 해결하기 위해 `HTML5`와 `WebSocket`이 등장하였으며, 이로써 완전한 양방형 통신이 가능해집니다.
- 웹소켓이 항상 정답은 아닙니다. `SSE`, `WebRTC` 등과 같은 기술을 통해, 좀 더 간단하게 혹은 웹소켓의 한계를 극복할 수도 있습니다.


# WebSocket API

- 웹소켓은 특정 상황에서의 이벤트 및 메소드만 파악하면 되기에 매우 단순합니다. 
- 크게 `연결`, `수신`, `송신`, `해제(에러)` 4가지 경우를 생각할 수 있습니다.
- 전반적인 웹소켓의 원리를 이해하기 위해 먼저 `바닐라JS 채팅 예제`를 살펴보고, 그 후에 많이 사용되는 `socket.io-client`을 활용한 예제를 살펴보겠습니다.
- 데이터 타입 및 구조는 예제와 다르게 구성할 수도 있으며, 예제에서는 간단하게 `console.log`를 활용하였지만 `innerHTML` 등을 활용하여 간단하게 렌더링하며 확인하실 수도 있습니다.


## 1. 지원 브라우저 확인
   - 약 97% 이상의 브라우저에서 환경에서 WebSocket이 활용 가능하나, 필요에 따라서 호환성 체크를 넣을 수 있습니다.

   ```js
   if(window.WebSocket)
   if(“WebSocket” in window)
   if(window[“WebSocket”])
   ```


## 2. socket instance 생성
 - `new WebSocket` 명령어로 간단하게 socket instance 생성이 가능합니다.
 - 즉, 유효한 URL만 알면 하나의 명령어로 지정된 서버에 연결할 수 있습니다.

```js
// 해당 주소는 webscket.org에서 제공하는 test 주소
const socket = new WebSocket('ws://echo.websocket.org')
```

## 3. 이벤트
 - socket 통신의 특정 상황이 되었을 때, 이하 이벤트들이 자동으로 발생됩니다.
 ### 3-1. OnOpen
 - 메세지를 보낼 준비가 된 상태 (socket이 연결되었을 때)

  ```js
  socket.onopen = function (event) {
    console.log('오징어 게임이 시작되었습니다.')
  }
  ```

  ### 3-2. OnMessage
  - 서버가 메세지를 보낼 때마다 해당 이벤트가 발생 (클라이언트 입장에서는 메세지가 도착했을 때)
  - video 파일도 전송 및 렌더가 가능하지만, video의 경우 `WebRTC` 등을 활용하는 것이 더 효율적이기에 json과 image 예제를 다뤄보겠습니다.

  ```js
  socket.onmessage = function (event) {
    if (typeof event.data === 'string') {
      // parsing이 필요한 경우
      const jsonObject = JSON.parse(event.data)
      const { userId, userName, userMessage } = jsonObject

      console.log(`참가번호 ${userId}번, ${userName} : ${userMessage}`)

      // image가 전달되는 경우
    } else if (event.data instanceof Blob) {
      const blob = event.data

      // 크롬의 경우 window.webkitURL
      window.URL = window.URL || window.webkitURL
      const source = window.URL.createObjectURL(blob)

      const image = document.createElement('img')
      image.src = source
      document.body.appendChild(image)
    }
  }
  ```

  ### 3-3. OnClose
  - 연결 종료 이벤트로 서버 혹은 클라이언트의 요청, TCP 에러로 발생 가능합니다.

  ```js
  socket.onclose = function (event) {
    const { reason } = event.data
    // event 파라미터는 다양한 기본 속성을 가지고 있습니다.
    const code = event.code
    const wasClean = event.wasClean

    if (wasClean) {
      console.log(`${reason}의 이유로 사망하였습니다.`)
    } else {
      console.log(`사망하였습니다.`)
    }

    // 정상적인 접속 해제가 아닌 경우, 재접속할 수 있는 로직을 설계하면 좋습니다.
    if (event.code !== 1000) {
      // 재연결 시도 로직…
      console.log('재참가 하시겠습니까?')
    }
  }
  ```

  ### 3-4. onerror
  - 예상치 못한 에러가 발생하였을때 나타나며, onerror 뒤에는 항상 onclose 이벤트가 발생합니다.

  ```js
  socket.onerror = function (event) {
    console.log(`Error:${event}`)
  }
  ```


## 4. 메소드
- 소켓통신이 접속된 경우, 이하 메소드로 이벤트를 발생시킬 수 있습니다.

   ### 4-1. send
   - 메세지 전송

   ```js
   buttonSendMessage.onclick = (event) => {
     if (socket.readyState === WebSocket.OPEN) {
       socket.send( { ‘data: 여기 사람이 죽었다구요!!!’ } )
     }
   }
   ```

   ### 4-2. close
   - 접속 종료

   ```js
   buttonStop.onclick = (event) => {
     if (socket.readyState == WebSocket.OPEN) {
       socket.close()
     }
   }
   ```

## 5. 속성
- 웹소켓에는 `url`, `protocol`, `readyState`, `bufferedAmount`, `binaryType` 등과 같은 직관적인 이름의 속성을 가지고 있어 활용할 수 있습니다.


# 'socket.io-client'
- `socket.io-client` 라이브러리를 활용하여 웹소켓보다 편하고 다양한 환경에서 소켓통신을 구현할 수 있습니다.
- 클라이언트와 서버 모두 해당 라이브러리를 사용해야 하며, 이해를 위해 서버 사이드 예제도 간단한게 추가해보았습니다.
- Node.js의 경우 Socket IO 외에도 WebSocket-Node, Node WebSocket Server 등 다양한게 존재합니다.
- Python의 경우 Tornado, Pywebsocket, Autobahn, txWS, WebSocket for Python 등이 있습니다.

## 1. on / emit
- `on`을 통해서 특정 이벤트 상황을 감지하고, `emit`을 통해서 이벤트를 발생 시키는 간단한 로직입니다.
- `이벤트명`과 `데이터 포맷` 등은 API를 구현하듯이 서버와 클라이언트가 맞추면 됩니다.

 ### 1-1. 클라이언트
 ```js
import io from 'socket.io-client'

const socketClient = io('http://192.168.43.183:3000')

// 추가적인 config 셋팅도 가능합니다.
// const socketClient = io('http://192.168.43.183:3000', { 설정: '설정값' })

// connect 이벤트를 감지합니다.
socketClient.on('connect', (socket) => {
  console.log('오징어 게임에 참여하였습니다.’)

  // 연결 중인 상태에서 disconnect 이벤트를 감지합니다.
  socket.on('disconnect', (socket) => {
    console.log('사망하였습니다.')
  })
})

// sendMessage 이벤트를 발생하여 데이터를 보냅니다.
socketClient.emit('sendMessage', { data: '여기 사람이 죽었다구요!!' })
```

 ### 1-2. 서버

 ```js
  io.on('sendMessage', (msg, roomName) => {
       // 메세지 관련 로직…
       console.log(msg)
       io.emit('sendMessage', msg);
   })

// 연결되어 있는 모든 클라이언트에게 데이터 전달
io.emit('welcome', { data: '오징어 게임에 오신 여러분을 환영합니다.' })

// 나를 제외한 다른 클라이언트에게 전달
socket.broadcast.emit('dead', { data: ‘사망자가 발생하였습니다.’ })

// 특정 소켓 클라이언트에게 전달
io.to('성기훈').emit('gooseul' { data: '우린 깐부잖아~’ });
```

## 2. Namespace
- Socket.io에는 네임스페이스가 존재하며 전체 메세지를 보내는 것은 `/` 네임스페이스에 메세지를 보내는 개념으로 생각해볼 수 있습니다.
- 연결 처리는 각각 이뤄지기에 연결 콜백을 만들어줘야 합니다.
- 이로써 특정 상황 혹은 같은 네임스페이스에 연결된 사람들끼리만 통신을 할 수 있습니다.
- 간단하게 클라이언트 사이드에서 연결 주소를 바꿔서 참가할 수 있습니다.

```js
// 서버
const squidGame = io.of('/오징어게임')
squidGame.on('connect', (socket) => {
  // ...
})

// 클라이언트
io.connect(‘호스트/오징어게임')
```

## 3. Room
   - 채팅방의 룸과 같은 개념으로 네임스페이스가 품고 있는 하위 개념입니다.
   - 서버 사이드에서 직접 관리(참여 및 탈퇴)를 하는 것이 네임스페이스와 가장 큰 차이점입니다.

   ### 3-1. 서버

   ```js
   // 특정 방에 참가합니다.
   socket.join('무궁화꽃이피었습니다')

   socket.on('message', (msg, roomName) => {
       // 연결된 모든 소켓들에 전달할 수 있습니다.
       io.emit('message', msg);

       // 특정 방의 소켓들에게 전달할 수 있습니다.
       io.to(roomName).emit('message', msg))

      // 나를 제외한 방안 모든 클라이언트에게 전달
       socket.broadcast.to(roomName).emit('message', msg)
     )
   })

   // 방을 옮길 수도 있습니다.
   socket.on('joinGame', (gameName, gameToJoin) => {
     // 기존 방을 나가고
     socket.leave(gameName);
     // 새로운 방에 들어갑니다.
     socket.join(gameToJoin);

     // 완료 시에 성공 신호를 보낼 수도 있습니다.
     socket.emit('gameChanged', joinedGame);
   })
   ```

   ### 3-2. 클라이언트

   ```js
   function enableSquidGame() {
     // 특정 네임스페이스에 접속할 수 있습니다.
     const squidGame = io.connect(‘호스트/오징어게임')

     squidGame.emit('getGameList')

     squidGame.on('gameList', (games) => {
       conosole.log(`게임 리스트는 ${_.map(games, (game) => game)}`)
     })
   }

   const sendMessage = (msg, roomName) => {
     socket.emit('message', msg, roomName)
   }

   function joinGame() {
     socket.emit('joinGame', '무궁화꽃이피었습니다', '뽑기')
   }

   socket.on('message', (msg) => {
     console.log(msg)
   })

   socket.on('gameChanged', (joinedGame) => {
     console.log(`${joinedGame}에 참여하였습니다.`)
   })
   ```

# References
- HTML5 웹소켓 프로그래밍 (밴고스 피터니어스)
- [MDN WebSocket](https://developer.mozilla.org/ko/docs/Web/API/WebSocket)
- [javascript info WebSocket](https://javascript.info/websocket)
- [Websocket.org](https://www.websocket.org/)

