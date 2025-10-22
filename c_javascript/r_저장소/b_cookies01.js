// 쿠키(Cookies)
// : 웹사이트가 사용자의 브라우저에 저장하는 작은 텍스트 파일

// ! 쿠키의 구성 요소 (구조)
// - 이름(name): 쿠키를 구분하는 식별자
// - 값(value): 쿠키에 저장할 실제 데이터 (문자열)
// - 만료 날짜(expires): 쿠키의 유효기간(없으면 세션 종료시 삭제)
// - 경로(path): 쿠키가 접근 가능한 경로 범위
// - 도메인(domain): 쿠키가 유효한 도메인 범위
// - Secure: HTTPS 연결에서만 전송
// - HttpOnly: JavaScript 에서 접근이 불가 (보안용)

// cf) http://localhost:8080 - 보안이 없는 브라우저
//    >> http's' 는 security 의 s 를 의미

// ! 쿠키의 한계
// - 용량 제한: 4KB 이하
// - 보안 취약: 누구나 읽을 수 있음 (개인정보 저장 금지)

// ! 쿠키 생성 및 수정
// : document.cookie 속성 
// - 웹 브라우저에 쿠키를 생성하고 관리

// 1) 쿠키 생성 및 수정
// document.cookie = "쿠키이름=쿠키값; expires=날짜; path=경로; domain=도메인";
// - 쿠키이름, 쿠키값 (필수 작성)
// - 나머지 값들은 선택 사항
document.cookie = "username=jeh; path=/";

// ? cf) 경로 VS 도메인
// % 경로(path): 쿠키가 유효한 URL 하위 경로의 범위를 제한
// ex) /, /domain, /user
// - 도메인 뒤에 이어지는 부분
// - 서버(사이트) 내의 특정 파일이나 페이지 위치를 나타냄

// ex) Set-Cookie: session=123; Path=/user;
// /user, /user/profile, /user/settings 요청에는 쿠키가 전송됨 ✅
// /admin, /api 요청에는 전송되지 않음 ❌
// 즉, Path는 쿠키가 전송될 URL 경로를 지정하는 필터

// % 도메인(domain): 쿠키가 유효한 웹사이트(서버의 주소) 범위를 결정
// ex) /example.com, /google.com
// ex) Set-Cookie: user=Eunhye; Domain=example.com; -> 이 쿠키는 example.com 과 하위 도메인들 (예: sub.example.com, api.example.com) 에서도 전송

// +) 같은 이름의 쿠키를 다시 설정(재할당)하면 자동 수정됨

// 2) 만료 날짜 설정
// : expires 속성으로 설정
// - 기본값(작성 안할시): 세션 쿠키로 자동 설정 -> 브라우저가 닫힐 때 자동 삭제
// - 만료 날짜값은 UTC(협정 셰게 시) 시간 단위를 가짐
//  >> KST(한국 표준 시) 시간 단위 +9h 느림
let date = new Date();
// Date객체.getTime(): 시간 데이터 가져오기(ms)
// Date객체.setTime(): 시간 데이터 설정

// date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
date.setTime(date.getTime() + (1 * 60 * 1000)); // 10분

let expires = "expires=" + date.toUTCString();
// 시간을 협정 세계시 문자열로 반환
// "expires=시간문자열"

document.cookie = "userEmail=qwe123;" + expires + "; path=/";

// ? 쿠키 만료 개념
// : 브라우저가 스스로 만료를 관리
// - 자동삭제(즉시 사라짐) X
// >> 브라우저가 쿠키에 접근하거나 갱신할 때 정리
// >> 만료시간 후에도 메모리상에는 잠시 남아있을 수 있음
console.log(document.cookie);

// 3) 쿠키 읽기
// : 쿠키는 하나의 문자열로 반환
console.log(document.cookie);
// username=lsa; username=lsa; useEmail=qwe123
// >> 문자열 이기 떄문에 직접 파싱

function getCookie(name) {
  let cookies = document.cookie.split('; ');
  // cf) for in 연산자
  // for(변수종류 변수명 in 객체명) { ... }
  // > 객체의 키(key)를 순회
  // > 사용 권장 대상: 일반 객체

  // cf) for of 연산자
  // for(변수종류 변수명 of 이터러블) { ... }
  // > 이터러블(순회할 수 있는 자료형: 배열, 문자열, Map, Set 등) 
  // > 실제 요소 값을 순회
  // > 사용 권장 대상: 배열, 문자열 등
  for(let cookie of cookies) {
    let [key, value] = cookie.split('='); // 구조분해할당
    if(key === name) return value;
  }
  return null;
}

console.log(getCookie("userEmail"));

// 4) 쿠키 삭제
// : 만료 시간을 과거 시간으로 설정하면 쿠키 삭제되는 것과 동일 효과를 냄
document.cookie = "username=; expires=Thu, 01, Jan 1970 00:00:00 GMT; path=/";