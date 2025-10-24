// * 타입 별칭
// 새로운 타입 이름을 생성하여 기존 타입을 참조할 수 있게 하는 기능
// - 코드의 재사용성과 가독성 향상

// 기본 사용 방법
// type 타입별칭 = 타입;
// +) 타입 별칭 지정시 일반 변수와의 차이를 위해 "UpperCamelCase" 사용 권장

// 1. 변수 타입 별칭: 사용 거의 안함
type TextType = string;
let textMsg1: TextType = '텍스트 문자열입니다.';
let textMsg2: string = '텍스트 문자열입니다.';

type NumberType = number;
let num1: NumberType = 123;
let num2: number = 234;

// cf) 원시 타입 키워드 그대로를 사용하는 것이 코드 해석과 가독성에 좋음

// 2. 객체 타입  별칭
// const user1: {
//   name: string;
//   height: number
// } = {
//   name: 'jeh',
//   height: 162
// }
// 아래처럼 별칭사용가능

type UserType = {
  name: string;
  height: number;
}

const user1: UserType = {
  name: 'jeh',
  height: 162
}

const user2: UserType = {
  name: '',
  height: 168
}

// 3) 함수 타입 별칭
// : UserType 타입인 매개변수를 받아 boolean 타입의 반환값을 생성하는 함수
// type 타입별칭 = (매개변수: 타입지정) => 반환타입;

// 예1)
type ValidUser = (user: UserType) => boolean;;

// cf) 함수 타입 별칭 사용시 함수 표현식 또는 화살표 함수 사용 권장
// 변수종류 함수명:타입별칭 = 화살표함수작성...
const isValid: ValidUser = (user) => user.name !== '';

console.log(isValid(user1)); // true
console.log(isValid(user2)); // false

// 예2)
type FuncType = (num: number) => number;
const exampleFunc: FuncType = (num) => {
  num *= 2;
  return num;
}

console.log(exampleFunc(3)); // 6

// 예3)
type ArrayReturnType = (num: number) => number[];
const arrayReturnFunc: ArrayReturnType = (num) => {
  return [num, num];
}

console.log(arrayReturnFunc(4)); // [ 4, 4 ]

// @ 타입 별칭 사용 예제
console.log('@ 타입 별칭 사용 예제');

// 1) 타입 어노테이션 사용
let age: number = 29;
let isStudent: boolean = true;
console.log(age);
console.log(isStudent);

// 2) 타입 별칭 사용
type ProductType = {
  id: string;
  name: string;
  price: number
}

let p1: ProductType = {
  id: '1',
  name: '컴퓨터',
  price: 15000
}

console.log(p1); // { id: '1', name: '컴퓨터', price: 15000 }