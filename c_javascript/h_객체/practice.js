// ! 배열
// 변수종류 변수명 = [값1, 값2, ...];

// ! 함수
// 1) 함수 선언문: function 함수명(매개변수 나열...) { ... }
// 2) 함수 표현식: 변수종류 변수명 = function (매개변수 나열...) { ... }
// 3) 화살표 함수: 변수종류 변수명 = (매개변수 나열...) => { ... }

// ! 객체
// 1) 리터럴방식
/*
  변수종류 변수명 = { 
    키1: 값,
    키2: {
      키: 값,
      키: 값,
      ...
    },

    키3: function () {
      기능정의...
    }, 

    키4: function () {
      기능정의...
    }
  }

  [필드 접근 방법]
  변수명(객체명).속성
  변수명(객체명).기능명();
*/ 

// 2) 생성자 함수 방식
// 3) 클래스 방식 (프로토타입)

// ! 객체, 배열, 함수 복습 문제

// === 문제 1 ===
// #1 객체 생성
//  : person 객체 생성 - name(문자열), age(숫자), isStudent(불리언) 속성 추가

let person = {
  name: '정은혜',
  age: 29,
  isStudent: true
}

// 객체의 속성값에 접근
// 1) 객체명.속성명;
// 2) 객체명['속성명'];
console.log(person.name); // 정은혜
console.log(person['name']);  // 정은혜

// # 2) 배열 생성
//    : fruits 배열을 생성하고, 여러 가지 과일 이름을 문자열로 추가 (3가지 이상)
//    - 두번째 과일을 콘솔에 출력
let fruits = ['banana', 'apple', 'mango'];
console.log(fruits[1]); // apple

// # 3) 함수 생성
// : 두 개의 숫자를 매개변수로 받아 그 합을 반환하는 add 함수 작성

// 함수 선언방식
function add1(a, b) {
  return a + b;
}
console.log(add1(3, 5)); // 8

// 함수 표현식
let add2 = function(a, b) {
  return a + b;
}
console.log(add2(3, 5)); // 8

// 화살표함수 방식
let add3 = (a, b) => a + b;
console.log(add3(3, 5)); // 8

// ! 문제2
/*
  ? 배열의 요소를 각각 순회하여 각 요소의 인덱스(객체의 경우: 키값)를 변수에 할당
    : 중괄호 내에서 인덱스를 활용
    >> 배열명[인덱스명]
    >> 객체명[키명]

    for(let 변수명 in 배열명/객체명) {

    }
*/
console.log('=== 문제 2 ===');
//& 1. 객체 탐색
// : 초급에서 작성한 person 객체의 모든 속성과 값을 순회하며 콘솔에 출력하는 코드를 작성
// >> for in 반복문 사용
for(let p in person) {
  console.log(person[p]);
}
// 정은혜
// 29
// true

// ! ★ answer 
let object = {};
for (let key in object) {
  console.log(`${key}: ${object[key]}`);
}

// cf) for in 반복문 사용 시 
// : 객체의 값 접근의 경우 '대괄호 표기법을 사용'
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

//& 2. 배열 메서드(배열 내장 함수) 사용
// : 초급에서 작성한 fruits의 모든 과일을 대문자로 변환하여 새 배열에 저장하고, 이 배열을 콘솔에 출력
let upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(upperFruits); // [ 'BANANA', 'APPLE', 'MANGO' ]

//& 3. 함수 활용
// : 두 개의 배열을 매개변수로 받아, 첫 번째 배열의 모든 요소에 두 번째 배열의 요소를 순서대로 더한 새 배열을 반환하는 함수를 작성
let func = function(arr1, arr2) {
  for(let i = 0; i < arr1.length; i++) {
    arr1[i] += arr2[i];
  }
  return arr1;
}
let result = func([1, 2, 3], [4, 5, 6]);
console.log(result); // [ 5, 7, 9 ]

//! == 문제 3 ==

//& 1. 객체 깊은 복사
// : person 객체를 '깊은 복사'하는 함수를 작성

// +) 객체의 깊은 복사 JSON 자료형을 사용
// >> JSON.stringfy(객체데이터)
// >> JSON.parse(JSON데이터)
// let copyPerson = {...person}
// console.log(copyPerson); // { name: '정은혜', age: 29, isStudent: true }

// ! ★ answer
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let personCopy = deepCopy(person);

personCopy.name = '정세이';
console.log('== DEEP COPY ===');
console.log(personCopy); // { name: '정세이', age: 29, isStudent: true }
console.log(person);  // { name: '정은혜', age: 29, isStudent: true }

//& 2. 배열과 객체를 활용한 데이터 처리
// : 아래의 users 배열에서 성인 사용자(18세 이상)만 필터링(filter)하고, 필터링된 사용자의 이름을 새 배열로 만들어 반환(map)하는 함수를 작성
// : 메서드 체이닝 사용

const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 17 },
  { name: "Doe", age: 18 }
];

let newArray = users
                  .filter(user => user.age >= 18)
                  .map(user => user.name); // new Array(user.name) XX

console.log(newArray); // [ 'John', 'Doe' ]


