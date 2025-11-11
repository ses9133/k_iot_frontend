// AccessToken & RefreshToken

/*
  JWT 기반 인증 구조
  : 일반적인 웹앱 로그인 과정
  1. 사용자가 아이디/비밀번호로 로그인 요청을 보냄
  2. 서버는 검증 후 Access Token + Refresh Token 두 개 발급함
  3. 클라이언트는 Access Token 을 저장(보통 메모리/Zustand 등 전역 저장)
    +) Refresh Token 은 HTTP only 쿠키로 저장 
    +)  Refresh Token 은 요청 인터셉터(api.ts) 메서드 내에 전달자체가 안됨
  4. 이후 토큰이 필요한 API 요청시 Authorization: Bearer <AccessToken> 형태로 보냄
  5. 서버는 AccessToken 을 검증하고 사용자 권한을 확인

  * AccessToken  이 짧은 만료시간을 가지는 이유
  - 보안상 이유
    : AccessToken 은 사용자 정보가 암호화되어 저장
    - 토큰이 탈취될 경우 공격자가 해당 사용자처럼 행동 가능
    - Access Token 은 유효기간 10~15 분 정도로 짧게 설정하여, 유출되더라도 피해 기간을 최소화

  * Access Token 의 만료기간이 짧을 경우의 불편함
    : Access 토큰의 만료기간(10~15분) 마다 다시 로그인
    - 해당 불편함을 줄이기 위해 Refresh Token 이 존재

  * Refresh Token 의 역할
    : Access Token 을 재발급할 수 있는 권한을 의미
    - 만료 수명: 김
    - 저장 위치: HTTP Only 쿠키 (JS 에서 접근 불가)
    - 노출 위험: 낮음(쿠키로만 전송)
    - 역할: AccessToken 재발급용
    - 노출시 위험: AccessToken 재발급만 가능, 즉시 사용 불가

  * Access Token
    - 만료 수명: 짧음
    - 저장위치: 메모리, localStorage 
    - 노출위험: 높음(API 헤더에 직접 포함)
    - 역할: API 요청시 인증 증명
    - 노출시 위험: 즉시 피해 가능
*/
