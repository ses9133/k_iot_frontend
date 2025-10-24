// 리터럴 (literal) 타입
// : 특정 값 만을 가질 수 있는 타입을 정의할 때 사용
// : 특정 값으로 타입을 제한

// 리터럴 타입 종류
// 1) 해당 값만을 가지는 상수(const)
let str1 = '안녕하세요'; // let str1: string
str1 = 'hello';
str1 = '곤치니와';

const str2 = '안녕하세요'; // const str2: "안녕하세요" (리러털 "안녕하세요" 타입)
// str2 = 'hello'; // Cannot assign to 'str2' because it is a constant.

// 2) 해당 값을 타입으로 지정한 변수
let num1 = 123;
num1 = 234;
num1 = 345;

let num2: 123 = 123; // let num2: 123
// num2 = 234; //Type '234' is not assignable to type '123'.

// > 다른 값을 할당하려고 하면 타입 에러가 발생

// 리터럴 타입 사용 예시
// : type 키워드(타입 별칭)와 함께 사용
// +) 유니언 타입과 함께 사용하여 다앙한 값을 표현함과 동시에 제한 가능
//    > 변수가 특정 값 들 중 하나만 가질 수 있도록 제한

// 1) 변수 사용
type Directions = 'up' | 'down' | 'left' | 'right';

let move: Directions;
// move = 'diagonal'; // Type '"diagonal"' is not assignable to type 'Directions'.
move = 'down';

let move2: string;
move2 = 'diagonal';

// 2) 매개변수 사용
// function setAlignment(align: 'left' | 'center' | 'right') {
//   let container = document.querySelector('#container');
//   container.style.textAlign = align;
// }
// setAlignment('center');

// 3) iot 반 학생 관리 시스템
type Students = '안미향' | '김세훈' | '김보민' | '손태경' | '김동후';
let student: Students;

function attendanceFunc(student: Students) {
  console.log(`${student}가 출석하였습니다.`);
}

//attendanceFunc('이승아'); // Argument of type '"이승아"' is not assignable to parameter of type 'Students'

attendanceFunc('김동후'); // 김동후가 출석하였습니다.

// cf) 리터럴 타입을 활용한 유니언 타입 사용시 여러 타입의 데이터 혼합 가능
type mixedType1 = 'yes' | 'no' | 1 | 2 | 3;
type mixedType2 = [1, 2] | { id: string; passoword: string; };

// * 객체 리터럴 타입
// : 실제 객체 데이터 정의와 같음
type UserType = {
  name: '정은혜';
  height: 162;
}

let user: UserType = {
  name: '정은혜',
  height: 162
}

// user.name = '정세이';

// @ 객체의 구조적 타이핑(덕 타이핑)
// 객체의 타입을 실제 값 보다는 그 구조나 멤버에 의해 결정하는 방식
// - 객체의 형태가 유사하다면 같은 타입으로 간주

type Person = {
  name: string;
  age: number;
}

function greet(person: Person) {
  console.log(`Name: ${person.name}, Age: ${person.age}`);
}

// Person 타입이 명시적으로 구현되지 않은 객체 생성
const p1 = {
  name: '짱구'
}

const p2 = {
  name: '맹구',
  age: 5,
  hobby: '축구'
}

const p3 = {
  name: '철수',
  age: 7
}

// greet(p1); - Person 타입의 구조와 일치하지 않음. (Person 으로 취급 X)
//  Argument of type '{ name: string; }' is not assignable to parameter of type 'Person'.
//   Property 'age' is missing in type '{ name: string; }' but required in type 'Person'

greet(p2); // Name: 맹구, Age: 5 - 구조적 타이핑에 의해 Person으로 취급됨(hobby 속성 무시됨)
greet(p3); // Name: 맹구, Age: 5 - Person 과 구조가 일치하기 때문에 Person 으로 취급됨

// @ 중첩된 객체 타입 정의
type Address = {
  street: string;
  readonly city: string;
  zipCode?: string;
}

type UserProfile = {
  username: string;
  email: string;
  address: Address; // 타입 객체의 구조를 가짐
}

let userProfile: UserProfile = {
  username: '정은혜',
  email: 'ses9133',
  address: {
    street: '구남로',
    city: 'busan'
    // zipCode 는 선택값
  }
}

userProfile.address.zipCode = '45613';

// @ 객체의 인덱스 서명
//  : 객체의 모든 속성에 대해 타입을 정의하지 않고, 키와 값의 타입만 정의하여 구조를 유연하게 적용하는 방법

type UserDataType = {
  // 일반적인 객체 속성 타입 명시
  name: string;

  // * 인덱스 서명(signature, 시그니처)
  // [속성명: 인덱스타입]: 값타입;
  [key: string]: string | number | boolean;

  // +) 키(key) 는 string 사용 권장, 값(value)은 어떤 타입으로든 가능
}

let userData: UserDataType = {
  name: '정은혜',
  height: 123,
  age: 29,
  isStudent: false,
  // hobby: ['운동', '독서'] -> 인덱스 서명(string | number | boolean) 존재하지 않는 값은 할당불가
}

userData.email = 'ses9133';
// userData.address = {city: 'busan'} (객체) -> 인덱스 서명(string | number | boolean) 존재하지 않는 값은 할당불가