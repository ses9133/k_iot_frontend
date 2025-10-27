// * 유니온 타입과 제네릭
// cf) 유니온 타입(OR, |)
// : 여러 타입 중 하나가 될 수 있는 값을 의미

// 유니온 타입을 제네릭 타입 변수에 활용
// : extends 키워드를 사용하여 확장

type StringOrNumber = string | number;

function unionGeneric<T extends StringOrNumber>(value: T) {
  // T 타입 변수에는 string 또는 number 자료형 사용해야함
  if(typeof value === 'string') {
    return value.toLowerCase();
  }
  return value; // 문자가 아닌 자료형(숫자형) 반환
}

const result1 = unionGeneric('sTrInG');
const result2 = unionGeneric(123); 
console.log(result1, result2); // string 123

// ! 제네릭 유틸리티 타입
// 타입스크립트에 내장된 제네릭 도구
// - 기존 타입을 변형하거나 조작하는데 사용

// @ 1) Partial(부분적인, 선택적인)
// : 모든 속성을 "선택적"으로 바꿔주는 타입
interface IUser {
  name: string;
  age: number;
}

// interface IUser {
//   name?: string;
//   age?: number;
// } --> Partial<IUser> (모든 속성을 선택적 프로퍼티로 만듦)

type ObjectSignature = {
  [key: number]: IUser; 
  // * 인덱스 시그니처 문법
  // : 객체의 키와 값의 타입 규칙을 정의하는 문법
  // 객체명[key] 로 접근할 수 있음
}

const users: ObjectSignature = {
  1: {
    name: '김태양',
    age: 20
  }, 
  2: {
    name: '권지애',
    age: 20
  }
}

// 실전 예시) 사용자 정보 수정 함수
// : id 값을 사용하여 해당 데이터의 name 또는 age 값을 수정
function updateUser(id: number, changes: Partial<IUser>) {
  const user = users[id];
  if(!user) {
    console.log('해당 아이디의 사용자는 없습니다.');
    return;
  }

  // changes 매개변수: name 과 age 속성 모두 선택적 프로퍼티
  // 1) name 만 있는 경우: { 기존의name, 기존의age, 변경될name } -> changes 의 name 값(마지막 선언된 name 값)으로 수정

  // 2) age 만 있는 경우: { 기존의name, 기존의age, 변경될age } -> changes 의 age 값으로 수정
  
  // 3) 둘 다 있는 경우: { 기존의name, 기존의age, 변경될name, 변경될age } -> 모든 값이 changes 로 수정

  // 4) 둘 다 없는 경우: 수정 X
  
  users[id] = { ...user, ...changes };
}

updateUser(1, {name: '정은혜'});
console.log(users[1]); // { name: '정은혜', age: 20 }

updateUser(2, {name: '김지선'});
console.log(users[2]);

updateUser(1, {age: 24});
console.log(users[1]); // { name: '정은혜', age: 24 }

updateUser(1, {}); 
console.log(users[1]); // { name: '정은혜', age: 24 }

// @ 2) Readonly
// - 모든 속성을 읽기 전용으로 변경(상수) 
// - Readonly<T>

interface IPerson {
  name: string;
  age: number;
}

let user: Readonly<IPerson> = {
  name: '안미향',
  age: 25
}

// user.name = '김세훈';
// user.age = 29
// -> user 라는 객체 자체가 let 데이터 종류 일지라도 내부 속성들이 Readonly 로 선언되었기 때문에 변경 XX

// @ 3) Omit(생략하다)
// : 특정 속성을 제거한 타입을 반환
// - Omit<T, K>
// - T 타입에서 K 속성을 제거

interface Employee {
  id: number;
  name: string;
  age: number;

  position: string; // 직급
  address: string;
  phone: string;
}

// 인사부(Employee 모든 속성 필요), 회계부(주소 필요없음), 총무부(주소, 전화번호 필요없음)
// interface EmployeeNotAddress {}
// interface EmployeeNotAddressAndPhone {}

type EmployeeForAccount = Omit<Employee, 'address'>; // 회계부용
type EmployeeForGeneral = Omit<Employee, 'address' | 'phone'>; // 총무부용
// > Omit 의 두번째 인자는 유니온 타입 사용 가능

const salaryA: EmployeeForAccount = {
  id: 1, 
  name: '이승아',
  age: 20,
  position: '회계부',
  phone: '010-7777-3333'
}

const generalA: EmployeeForGeneral = {
  id: 1, 
  name: '이승아',
  age: 20,
  position: '총무부',
  // phone: '010-7777-3333' // Object literal may only specify known properties, and 'phone' does not exist in type 'EmployeeForGeneral
}

