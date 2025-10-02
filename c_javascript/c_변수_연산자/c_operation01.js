// === 연산자 === //

// ! === 연산자 === //
// : 수학적 계산을 위한 코드 (산술, 할당, 비교, 논리)

// # 산술 연산자
// : 사칙 연산, ++, --, %(나눗셈의 나머지)

let x = 10;
let y = 3;
console.log('== 산술 연산자 ==');
console.log(x + y);
console.log(x - y);
console.log(x * y);
console.log(x / y);
console.log(x % y);

// cf) 증감연산자: 수를 1씩 증가 또는 감소
x = 10;
console.log(x++);
console.log(x);
console.log(++y);

// # 할당(대입) 연산자
// = (할당), +=, -=, *=, /=, %=

// # 비교 연산자
//  : 결과를 boolean 값으로 반환(상대적인 크기를 비교)
//  - 부등호: >, <, >=, <=
//  - 동등, 부등: ==, !=
//  - 일치, 불일치: ===, !==

// ? 동등(부등) VS 일치(불일치)
let value1 = 10;
let value2 = '10';

// 1) 동등, 부등: 값의 동일성을 판단(데이터 유형 고려 X)
console.log(value1 == value2); // true

// 2) 일치, 불일치: 
console.log(value1 === value2);

// cf) 문자열 비교 연산자
//    : 정렬(기본값 - 오름차순)
//    - a부터 z까지 뒤로 갈수록 큰 값 
let str1 = 'abc'; // 123
let str2 = 'bdc'; // 234

console.log(str1 < str2);
console.log(str1 === str2);
console.log(str1 > str2);
