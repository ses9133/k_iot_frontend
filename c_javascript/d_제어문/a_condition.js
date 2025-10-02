// ! cf) 제어문: 프로그래밍 실행 흐름을 제어하는 문법
//      >> 조건문(condition), 반복문(loop)

// *=== 자바스크립트 '조건문' === //
// : 주어진 조건에 따라코드 실행 흐름을 제어
//- '조건'에는 주로 비교 연산자를 활용
//      >> boolean 값을 통해 조건을 검증
// - if문, else 문, else if 문, switch 문

// ! 1) if문 & else 문 & else if 문
/*
if(조건식) {
  조건이 참일 때 실행
} else if (조건식) {
  앞선 조건은 거짓 + 해당 조건을 참인 경우 실행
}
...
} else {
  앞선 모든 조건이 거짓일 때 실행
}

*/

// ? 자바 변수 선언 및 초기화: 
// 데이터타입 변수명 = 대입값;
// let(|| var || const) 변수명 = 대입값;
// 변수종류(변수 | 상수) 변수명 = 대입값;

let number = 10;
if(number > 0) {
  console.log(number);
} 

// cf) 변수명(식별자)을 활용한 조건 검증
//    false값: '', 0, undefined, null 등
let stringData = '';
let numberData = 0;

if(stringData || numberData) {
  console.log('실행되지 않아용');
}
console.log('실행O');

// if/else if/else 문 예제
let num = '0';

if(num < 0) {
  console.log('음수입니다.');
} else if(num === 0) {
  console.log('0입니다.');
} else {
  console.log('양수입니다.');
}

// cf) 실행될 코드 블럭이 한 줄 일경우 코드 축약 가능
if(num < 0) console.log('음수입니다.');
else if(num === 0) console.log('0입니다.');
else console.log('양수입니다.');

// ? 조건문 예제
console.log('=== 연습1 ===');
let age = 14;
if(age < 13) console.log('어린이');
else if(age >= 13 && age < 20) console.log('청소년');
else console.log('성인');

console.log('=== switch case 문 ====');
// ! 2) switch case 문
//  : 하나의 표현식 값을 확인하고 해당 값과 일치하는 case 문의 코드 블록을 실행
// - switch 블록 내에 case 값들이 나열
//  +) 어떤 case 와도 일치하지 않을 경우에 default 문 실행
let fruit = 'banana';

// case 의 데이터 유형은 switch 식의 데이터 유형과 일치 해야함
switch(fruit) {
  case 'apple': 
    console.log('사과');
    break;
  case 'banana':
    console.log('바나나');
    break;
  case 'train':
    console.log('바나나는 길다');
    break;
  default:
    console.log('일치조건없음');
}

console.log('※ 연습 2 ※');
let score;
let grade;
console.log('=== if 조건문 ===');
score = 10;

if(score >= 90 && score <= 100) grade = 'A';
else if(score >= 80 && score < 90) grade = 'B';
else if(score >= 70 && score < 80) grade = 'C';
else if(score >= 60 && score < 70) grade = 'D'
else if(score >= 0 && score < 60) grade = 'F'
else console.log('유효한 점수가 아닙니다.');
console.log(grade);
  
console.log('=== 삼항 연산자 ===');
grade = (score >= 90 && score <= 100) ? 'A'
        : (score >= 80 && score < 90) ? 'B'
        : (score >= 70 && score < 80) ? 'C'
        : (score >= 60 && score < 70) ? 'D'
        : (score >= 0 && score < 60) ? 'E'
        : console.log('유효한 점수가 아닙니다.');

grade =
  score > 100 || score < 0 
  ? '유효한 점수가 아닙니다.' : score >= 90
  ? 'A' : score >= 80
  ? 'B' : score >= 70
  ? 'C' : score >= 60
  ? 'D' : 'F';

console.log(`학점은 ${grade} 입니다.`);

console.log('=== switch ===');
switch(true) {
  case (score > 100 || score < 0):
    console.log('유효한 점수가 아닙니다.');
    break;
  case (score >= 90):
    grade = 'A';
    break;
  case (score >= 80):
    grade = 'B';
    break;
  case (score >= 70):
    grade = 'C';
    break;
  default:
    grade = 'F';
}
console.log(`학점은 ${grade} 입니다.`);