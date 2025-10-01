// ! 자바스크립트 파일 확장자: .js

// 1) 한 줄 주석: //
// 2) 여러 줄 주석: /**/

/*
  JS 의 
  여러 줄 
  주석입니다~
*/

// # 간단한 JS 예제

// 기능
// : 버튼을 클릭하면 새로운 이름을 입력받는 창이 생성, 작성된 이름으로 버튼 내의 Player 명이 변경

// 현재 웹 문서에서 button 태그를 찾아 저장
// ? querySelector 
const button = document.querySelector('button');

// 저장된 변수에 클릭 이벤트를 추가 .addEventListener()
// 변수명.기능(); --> 객체 형식
button.addEventListener('click', updateName);

// updateName: 새로운 이름을 입력받고 버튼을 수정하는 기능
// 사용자 정의 함수
function updateName() {
  const name = prompt('새로운 이름을 입력해주세요.');
  button.textContent = `Player 1: ${name}`;
}

// ! 플러그인 설치
// - 코드 스니펫(Javascript(ES6) code snippets) 설치
// >> JS 단축키 제공

// clg: console.log(); 단축어
//   - 간단한 코드, 결과값 출력 (개발자 친화적 코드)
//  > [개발자 도구] > [console]
console.log('안녕하세요');

// fun 
function name(params) {
  
}

// fof
for (const item of object) {
  
}

// fin
for (const item in object) {
  
}

// imp
import moduleName from 'module';



