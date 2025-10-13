// == 자바스크립트 함수 구조: 매개변수/인자/반환값 == //

// ! 1. 매개변수(parameter) VS 인자(argument)
// - 매개변수: 함수에 전달될 데이터를 담는 변수
// - 인자: 함수 호출시 전달하는 값

function add(a, b) { // 변수 타입 명시 X(자바와의 차이)
  console.log(a + b);
}

add(3, 6); // 9

// ! 2. JS 에서의 매개변수, 인자 특징
// : 매개변수와 인자의 수가 반드시 일치할 필요 X
function log(a) {
  console.log(a);
}

log(); // undefined 
// - 인자를 전달하지 않은 파라미터의 값은 undefined
// >> undefined: 변수를 선언하고 초기화되기 이전의 타입

log('안녕'); //안녕
log('Hello', 'Hi'); // Hello
// 지정된 수의 파라미터 이상의 인수는 읽히지 않음(무시됨)

function introduce(name, age) {
  console.log(`${name} is ${age} years old`);
}

introduce('정은혜', 29); // 정은혜 is 29 years old
introduce(29, '정은혜'); // 29 is 정은혜 years old >> 매개변수에 차례대로 인자값이 전달됨
introduce(29); // 29 is undefined years old

// ! 3. 반환값 (return값)
// : 결과를 반환
// - 함수 내에서 return 키워드가 읽히면 함수의 실행을 즉시 중단하고 return 뒤의 값을 반환
function subtract(a, b) {
  let result = a - b;
  return result;
  // console.log('안녕하세요'); // Unreachable code detected.
  // >> return 과 같은 스코프에서 키워드 뒤의 코드는 읽히지 않음
}

let outcome = subtract(10, 7);
console.log(outcome); // 3
console.log(subtract(20, 1)); // 19

// cf) return 키워드가 없는 함수는 실행 시 undefined 를 반환
function noReturn() {
  console.log('Hello');
}

console.log(noReturn());
// Hello
// undefined 

// === 연습문제 === //
// - square1, 2, 3 함수 작성
// - 파라미터 x로 지정
// - 반환값으로 x 의 제곱을 지정
// - 함수 선언 방식 3가지 모두 사용 마지막 결과를 콘솔에 출력

// ? 1) 함수 선언문 방식
function square1(x) {
  return x * x;
}
console.log(square1(3));

// ? 2) 함수 표현식 방식
let square2 = function(x) {
  return x * x;
}
console.log(square2(5));

// ? 3) 화살표 함수 방식
// let square3 = (x) => {
//   return x * x;
// }
// 아래 처럼 생략 가능
let square3 = x =>  x * x; 

console.log(square3(6));

