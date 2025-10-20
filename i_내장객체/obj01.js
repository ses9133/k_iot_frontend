// ! 자바스크립트 내장 객체
// : 특정 작업 수행이나 복잡한 기능을 담은 메서드와 속성 제공

// 1. Number 객체의 기본 메서드
// 2. String 객체의 기본 메서드

// # 1. Number 객체의 기본 메시지
//  : 수치형 데이터를 처리하는 속성과 메서드를 포함한 JS 내장 객체
//  > number 자료형

// ! 1) toFixed(N): N자리까지의 반올림
let num = 123.4567;
console.log(num.toFixed(3));
console.log(num.toFixed(1));
console.log(num.toFixed()); // 자릿수 지정하지 않으면 소수점 전체 반올림하여 정수 반환

// ! 2) isNaN(), isFinite()
// : NaN 값인지, Infinitiy() 값인지 확인
let notNum = Number('숫자로 변환할 수  없는 값');

console.log(notNum); // NaN
console.log(notNum === NaN); // false
console.log(Number.isNaN(notNum)); // true

// Infinity
console.log(10/0); // Infinity
console.log(-10/0); // -Infinity

// cf) finity : 유한, infinity: 무한
console.log(Number.isFinite(10 / 0)); false

// ! 1) trim(): 문자열 양쪽 공백제거(띄어쓰기, 줄바꿈)
let str = `   
만나서
반갑습니다.
:)    `;
console.log(str.trim());

// ! 2) split() : 문자열을 특정 기호로 나누어 배열로 반환
let manyData = `

`;