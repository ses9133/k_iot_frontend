// * === 타입 스크립트의 '타입' === //
// - 타입 명시가 필수 사항은 아님
// - 타입명시: 프로그램의 안정성 향상과 가독성 높이는 역할

// * 타입 명시 방법
// : 타입 어노테이션 (타입 주석)
// - 변수명 뒤에 콜론을 사용하여 타입 지정

// * 타입 종류
// 1. 기본 타입(원시 타입 - string, number, boolean 등)
// : typeof 연산자 (문자열로 타입 반환)
let name: string = '정은혜';
let age: number = 29;
let isStudent: boolean = true;
// 권장 작성 형태) 변수종류 변수명: 타입명 = 값;

let anyData = '문자열'; // 타입 작성 생략 가능하나 이것은 타입 체킹을 생략하는 것이 아님
// anyData = 123; // Type 'number' is not assignable to type 'string' , 타입을 명시하지 않아도 초기화 데이터 타입이 지정됨

// 2. 배열 타입
// 1) 기본 타입명 뒤에 [] 작성
let list1: string[] = ['j', 'e', 'h'];

// 2) 제네릭 타입: Array<타입>
let list2: Array<number> = [1, 2, 3];

// 3) void 타입: 아무런 값이 없음을 나타냄, 주로 함수의 반환값이 없거나 return 키워드 뒤에 값이 없는 경우 사용됨
// 함수 타입 지정 방법
/*
  function 함수명 (파라미터: 파라미터타입): 함수반환타입 { ... }
*/

// function voidType(param) {
// } // 'param' is declared but its value is never read.

// function voidType(param) {
//   console.log(param);
// } // Parameter 'param' implicitly has an 'any' type.
// * TS 에는 파라미터 타입 미지정시 오류 발생 (반환타입 작성은 선택적)

function voidType(param:number): void {
  console.log(param);
}
voidType(10); // 10

function stringReturn(str1: string, str2: string): string {
  return str1 + str2;
}
console.log(stringReturn('정', '은혜')); // 정은혜

// 4) null & undefined
// * JS 와의 차이점
// JS 는 각각의 타입에 다른 타입의 데이터 지정 가능(null <-> undefined 가능)
// TS 는 각각의 타입으로 지정된 변수는 각 타입만 할당 가능
let nullType = null;
nullType = 'hello';

// let nullType2: null = null; // *타입 주석을 사용한 타입 강화시, 지정한 타입 외의 값 할당 불가능
// nullType2 = 'hello';

let undefined;
undefined = 'hello';
undefined = 123;

// let undefined2 = undefined; // *타입 주석을 사용한 타입 강화시, 지정한 타입 외의 값 할당 불가능
// undefined2 = 'hello';

// 5) any 타입 (모든)
// 모든 타입에 대해 허용하는 타입
// 타입 검사 오류 방지를 위해 사용 (모든 타입과 호환 가능)
// 사전에 오류 타입 계산 불가 (ts를 js 처럼 사용)
let anyType: any = 3;
anyType = 'hello';
anyType = 123;
anyType = {};
anyType = [];

let unknownData;
// 변수 선언시 직접적인 타입 명시를 하지 않을 경우, 값이 할당되기 전까지 자동으로 any 타입으로 간주
// let unknownData: any

// 6) never 타입
// 절대 발생하지 않는 값의 타입
// 함수가 예외를 발생시키거나 끝나지 않을 때 사용
// function error(message: string): never {
//   throw new Error(message);
// }

// error('에러발생!!');

// @ 타입 어노테이션 사용 예제 @ //
// 문제1: 기본 타입 정의하기
let username: string;
let userAge: number;
let isSubscribed: boolean;

// 문제2: 배열 타입 정의하기
let fruits: string[];
// let numbers: number[];
let numbers: Array<number>;

// 문제3: void 타입을 사용하는 함수 정의하기
function printMessage(message1:string): void {
  console.log(message1);
}

printMessage('message1');