// practice01.ts
// export const tmp = '';

//& ============ 유니언 =============//
//! 1. Union 타입을 사용한 변수 선언
// string, number, boolean 중 하나의 타입을 가질 수 있는 MixedType 변수를 선언하고, 각 타입에 해당하는 값을 할당하는 예시 코드를 작성
type MixedType = string | number | boolean;
// let name: MixedType = '정은혜';
// let age: MixedType = 29;
// let isStudent: MixedType = true;
let myVariable: MixedType;
myVariable = '정은혜';

//! 2. 함수 매개변수에 Union 타입 적용
// number와 string 타입 중 하나를 매개변수로 받아, 해당 값이 number일 경우 숫자를 2배로 증가시키고, string일 경우 그대로 반환하는 함수 doubleOrNothing을 작성
type Mixed = string | number;
function doubleOrNothing(param: Mixed) { // doubleOrNothing(input: string | number)
  if(typeof param === 'number') {
    param *= 2; 
    return param;
  } else {
    return param;
  }
}

console.log(doubleOrNothing('정은혜'));
console.log(doubleOrNothing(10));


//! 3. Union 타입과 타입 가드를 활용한 고급 예제
// Admin과 User 타입 명시
// - Admin은 id (number 타입)와 isAdmin (boolean 타입) 속성을, User는 id (number 타입)와 username (string 타입) 속성 포함
type Admin = {
  id: number;
  isAdmin: boolean;
}

type User = {
  id: number;
  username: string;
}

//? - 두 타입의 유니온 타입을 사용하여 Person 타입을 선언하고, id, isAdmin, username 중 적절한 속성을 가진 객체를 생성
type Person = Admin | User;
const p1: Person = {
  id: 1,
  isAdmin: true,
  username: "ses9133"
}

//? - Person 타입의 객체를 매개변수로 받아 Admin인지 User인지를 구분해 출력하는 함수 identifyPerson을 작성
function identifyPerson(param: Person) {
  if('isAdmin' in param) {
    console.log('매개변수 타입: Admin');
  } else {
    console.log('매개변수 타입: User');
  }
}

let p2: Person = {
  id: 2,
  isAdmin: true
}

let p3: Person = {
  id: 3,
  username: "ses9133"
}

identifyPerson(p2); // 매개변수 타입: Admin
identifyPerson(p3);  // 매개변수 타입: User

//& ============ 인터섹션 =============//
//! 문제 1: 기본 Intersection 타입 생성
// - Person 타입과 ContactDetails 타입을 결합하여 Employee 타입을 생성
// - Employee 타입은 Person의 모든 속성(name, age)과 ContactDetails의 모든 속성(email, phone)을 포함
type Person2 = {
  name: string;
  age: number;
}

type ContactDetails = {
  email: string;
  phone: string;
}

type Employee = Person2 & ContactDetails;

//! 문제 2: 함수 반환 타입으로 Intersection 사용
// - Vehicle 타입과 Engine 타입을 결합하여 Car 타입 생성
// - createCar 함수를 구현하여, 주어진 Vehicle과 Engine 정보를 받아 Car 객체를 반환하도록 구현
type Vehicle = {
  vehicleName: string;
}

type Engine = {
  engineName: string;
}

type Car = Vehicle & Engine;

// function createCar(param: Car) {
//   return param;
// }

function createCar(vehicle: Vehicle, engine: Engine): Car {
  return {...vehicle, ...engine};
} 

// let car1: Car = {
//   vehicleName: '기아',
//   engineName: '엔진1'
// }
let v1: Vehicle = {
  vehicleName: '기아' 
}

let v2: Engine = {
  engineName: '하이브리드'
}

console.log(createCar(car1)); // { vehicleName: '기아', engineName: '엔진1' }
console.log(createCar(v1, v2)); // { vehicleName: '기아', engineName: '하이브리드' }
