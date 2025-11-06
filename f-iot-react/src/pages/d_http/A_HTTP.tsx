import React from 'react'

/*
! HTTP 통신
: HyperText Transfer Protocol
- 클라이언트(예: 웹 브라우저)와 서버(예: 웹 서버)가 데이터를 주고받기 위한 약속(프로토콜)
  "사용자가 요청(request)을 보내면, 서버가 응답(response)을 돌려준다"

! HTTP 요청(Request)
: 클라이언트가 서버에게 보내는 정보
- URL: 요청할 자원의 주소("어디에 보낼지")
    EX) https://api.example.com/api/v1/users - REST API
- Method: 어떤 동작을 할지 표현("어떻게 보낼지")
    EX) GET, POST, PUT, DELETE 등
- Headers: 부가 정보(형식, 인증 등)
    EX) Authorization, Content-Type, Accept 등
- Body: 서버로 보낼 실제 데이터 (POST/PUT 등에서 사용)
    EX) { "name": "이승아", "email": "devgiants75" }

  POST  /users HTTP/1.1 
  Host: api.example.com
  Content-Type: application/json - JSON 형식으로 보냄
  Authorization: Bearer abc123token - 로그인한 사용자의 토큰

  {
    "name": "정은혜",
    "email": "ses9133@naver.com"
  }
*/

/*
  * HTTP 응답(Response)
  : 서버가 클라이언트에게 돌려주는 정보
  - Status Code: 요청 결과 상태 코드
  - Headers: 응답의 부가정보
    ex) Content-Type
  - Body: 실제 응답 데이터
    ex) {
          "name": "정은혜",
          "email": "ses9133@naver.com"
        }

  * 자주 쓰는 HTTP 상태 코드
  200 OK: 성공 - 요청이 정상적으로 처리됨
  201 Created: 생성됨 - 새 리소스가 성공적으로 만들어짐

  400 Bad Request: 잘못된 요청  - 요청 형식이 잘못됨
  401 UnAuthorized: 인증 실패   - 로그인 토큰이 없거나 잘못됨
  403 Forbidden: 권한 없음  - 권한이 부족함
  404 Not Found: 자원을 찾을 수 없음  - 요청한 데이터가 존재하지 않음
  
  500 Internal Server Error: 서버 오류 - 서버에서 예기치 못한 오류 발생

  HTTP/1.1 201 Created
  Content-Type: application/json
  {
    "name": "정은혜",
    "email": "ses9133@naver.com"
  }
*/

/*
  * REST 스타일
  - HTTP 요청을 자원 중심으로 표현하는 방식

  - 자원) 데이터의 이름, 
  ex) /api/v1/users, /api/b1/users/1/reviews/10
      /api/v1/users/me
      /api/v1/uses/me/reviews ...
  - 행동) 무엇을 할 것인지

  ? PUT VS PATCH
: 데이터 수정 HTTP 메서드

@ 1) "PUT: 전체를 새로 교체"
    - 회원 전체 정보 바꾸기
    - 기존 걸 통째로 갈아끼움

@ 2) PATCH: 일부만 수정
    - 회원 닉네임만 바꾸기 등
    - 변경된 부분만 수정

>> PUT은 단순하고 예측 가능함
    : 항상 "전체를 교체한다"라는 규칙!
    - 보내준 코드로 완전히 덮어씌우면 된다!
>> PATCH를 모든 API에서 지원하지 X
    : 일부 오래된 시스템 또는 프레임워크는 PATCH를 지원하지 X - PUT으로 통일하여 사용
*/


function A_HTTP() {
  return (
    <div>A_HTTP</div>
  )
}

export default A_HTTP