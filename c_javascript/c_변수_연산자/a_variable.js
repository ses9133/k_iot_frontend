// ! 변수: 데이터를 저장하기 위한 공간

// * 필수 명명 규칙 //
//  - 첫문자: 영문자, _, $ 만 가능
//  - 띄어쓰기 허용 X
//  - 대소문자 구분
//  - 예약어 사용 X

// 선택 명명 규칙 //
// - lowerCaemlCase 사용 권장

// ex) now, _now, now$25, now_25 (가능)
// ex) 25now, now 25, *now (X)

// ? 올해 연도(currentYear), 태언나 연도(birthYear)
// 나이: age = currentYear - birthYear

// ! JS 변수 선언 방식 (2가지 - let, var) //
// 1) 변수 선언 방법: 변수종류 변수명;
let letVar; 
var varVar; // Variable

// 2) 변수 할당(대입) 방법: 변수명 = 데이터;
letVar = 10;
varVar = 20;

// 3) 변수 선언과 동시에 초기화 
let letVar2 = 10;
let varVar2 = 20;

// ! let VS var
// 1. 공통점: 재할당 가능(변수의 특성), 호이스팅

// ? 호이스팅
//  : 인터프리터(코드를 읽는 기기)가 코드를 실행하기 전 변수, 함수, 클래스 등의 선언문을 해당 범위의 맨 위로 올리는 것
//  - let, var 둘다 호이스팅됨

// 2. 차이점
//  - let: 동일한 영역 내에서 재선언 불가(선언부에 올려지고 초기화되지 않아 접근 불가능)
//  - var: 동일한 영역 내에서 재선언 가능(선언시 undefined 초기화되어 접근 가능)

// ? TDZ(Temporal Dead Zone): 변수가 선언되고 초기화되기 까지의 공간
// - let 은 TDZ 에 있을 경우 사용 불가
// - var 는 TDZ 의 변수값 사용이 가능

// let letVar; -> 재선언 불가
var varVar; // -> 재선언 가능
console.log(varVar);

//letVar3 = 30; // 변수 선언 전 초기화 가능
// console.log(letVar3); -> 코드오류는 안나지만 실행 오류가 남
// Cannot access 'letVar3' before initialization
//  > 호이스팅이 되지만, 실질적인 선언 문장을 읽기 전에는 호출이 불가능함!

varVar3 = 40;
console.log(varVar3); // 호이스팅과 TDZ 접근 가능으로 내용값 출력이 가능

let letVar3; 
var varVar3;

// ! 변수 선언 예시(나이 계산 프로그램)
let currentYear = 2025;
let birthYear = 2000;

let age;
age = currentYear - birthYear;
console.log(birthYear + '년도에 태어난 사람의 나이는 ' + age + '세 입니다.');

// ! 상수(const)
//  : 변하지 않는 수, 한 번 할당된 값 변경 X (재할당 불가능)
//  - 선언과 동시에 반드시 초기화가 이루어져야함

// ? 상수 명명규칙(필수 - 변수와 동일)
// * 명명규칙: UPPER_SNAKE_CASE

const PI = 3.14;
// PI = 2.14; // Assignment to constant variable. -> const 는 값 재할당 불가능
