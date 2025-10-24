// let num: number = 10;
// * TS 는 파일 단위의 스코프(범위, 영역)이 생성되지 않음
// - node_modules 가 존재하는 프로젝트 최상단(전체) 범위가 스코프의 전역 스코프로 생성됨

// * 스코프 생성 방법
// 1) 중괄호 사용법: 직관적인 스코프 생성
{
  let num = 10;
}

{
  let num = 20;
}

// 2) export 키워드 사용법
// : export 키워드 사용시 ts 파일이 자동으로 모듈로 인식됨
// - 외부 전역 스코프와의 충돌을 방지
export const tmp = ''; 
let num = 10;
console.log(num);

// * TS 와 JS 의 차이
let message = "hello"; // 변수에 담긴 데이터 타입을 자동 인식
console.log(message.toUpperCase());

// message(); 
// This expression is not callable. Type 'String' has no call signatures.

let message2 = () => {
    console.log('hello');
}

message2();

// 포맷터 진행: ctrl + k + f