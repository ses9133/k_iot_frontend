// === 콜백 함수를 활용하는 JS 의 내장 함수 === //

// ! '배열'이 가지는 콜백 함수를 활용
// : 배열 자체가 데이터 타입
// - 배열과 함께 사용되는 콜백 함수이기 때문에 이 내장 함수는 '메서드의 형태'임

// cf) 함수 VS 메서드
// - 함수는 독립적인 기능을 수행
// - 메서드는 특정 구조(클래스)에 소속된 함수
// > Object.속성 / Object.메서드()
//    : 객체 내부의 기능과 동작을 사용

// ! 배열의 콜백함수 형태
// : 배열.메서드(콜백함수)
// - 콜백함수를 가지는 배열 메서드는 공통적으로 '배열을 순회'
// - 콜백함수는 3가지 선언 형식 모두 사용 가능

// ! 배열의 콜백함수의 인자값
// ? function callback(value, index, arrray) { ... }

// EX) [4, 3, 2, 5, 1]
// - value: 배열에서 순회되는 각 요소 - 4, 3, 2, 5, 1
// - index: 순회되는 각 요소의 인덱스 번호 - 0, 1, 2, 3, 4
// - array: 배열 그 자체 - [4, 3, 2, 5, 1]

// >> 콜백 함수의 인자값은 필수가 아님(주로 value 만 사용)
//    : 사용하지 않는 인자값은 생략 가능

// ? function callback(value) {}
// ? function callback(value, index) {}
// ? function callback(, index, array) {} - 순서가 중요 (비워지는 인자값의 공간은 남겨둠)
// ? function callback(,,array);

// ! 배열의 콜백함수 메서드
// : 각 요소에 대해 동일한 함수 실행
// : 배열 내부의 요소를 매개변수로 사용하는 콜백함수를 호출
const numbers = [23, 41, 19, 7, 36];
const anyArray = [123, '123', true, [1, 2, 3]];

// === forEach() === //
// - 사용값 반환 X
// 형태: numbers.forEach(콜백함수);
console.log('=== forEach() ===');

numbers.forEach(function(value, index, array) {
  // 모든 요소에 동일하게 적용하는 기능
  console.log(`${index + 1} 번째 요소의 값: ${value}`);
});
// 1 번째 요소의 값: 23
// 2 번째 요소의 값: 41
// 3 번째 요소의 값: 19
// 4 번째 요소의 값: 7
// 5 번째 요소의 값: 36

anyArray.forEach(function(value, index, array) {});

// === map() === //
// - 각 요소에 대해 동일한 함수 실행후 새로운 배열을 생성하여 반환
console.log('=== map() ===');

const newNumbers = numbers.map(function callback(value) {
  let square = value * value;
  return square;
});
console.log(newNumbers); // [ 529, 1681, 361, 49, 1296 ]

// const arrowNumbers = numbers.map((value, index, array) => {
//   let square = value * value;
//   return square;
// }); -> 아래처럼 간단하게 작성 가능

const arrowNumbers = numbers.map(value => value * value);
console.log(arrowNumbers); // [ 529, 1681, 361, 49, 1296 ]

// === filter() === //
// - 각 요소에 대해 동일한 함수 실행후 콜백함수의 리턴값이 true 인 요소만 모아서 새로운 배열을 생성하여 반환
console.log('=== filter() ===');

const basicArray = [0, 1, 2, 3, 4, 5];
const evenNumbers = basicArray.filter(v => v % 2 == 0); // value, index, array 의 순서만 보장되면 콜백함수의 인자명은 변경 가능
// 아래처럼 풀어서 쓸수있어야함
// basicArray.filter(function(value) {
//   return value % 2 === 0;
// })

console.log(`원래 배열: ${basicArray} / 짝수 배열: ${evenNumbers}`); // 원래 배열: 0,1,2,3,4,5 / 짝수 배열: 0,2,4

// ! === 배열을 활용한 콜백함수 예제 === ! //
let cars = ['audi', 'bmw', 'volvo', 'hyundai'];
cars.forEach(car => console.log(car));

// ? 콜백함수의 매개변수명 지정
const taskTags = ['오늘까지 끝내기', '중요한 일', '중요도가 낮은 일'];
taskTags.forEach(taskTag => console.log(taskTag));
// taskTags.forEach(tt => console.log(tt)); -> 이렇게 쓰지말자...

// 1) 전체 배열의 요소를 대문자로 변환 
// : 문자열.toUpperCase();
let carsUpperCase = cars.map(function(car) {
  return car.toUpperCase();
});
console.log(carsUpperCase); // [ 'AUDI', 'BMW', 'VOLVO', 'HYUNDAI' ]

// 2) 전체 배열 요소중 문자열 길이가 4보다 큰 요소만 반환
// : 문자열.length
let longNameCars = cars.filter(car => car.length > 4);

// 아래처럼 풀어서 생각할줄 알아야함
// cars.filter(function(car) {
//   return car.length > 4;
// });

console.log(longNameCars); // [ 'volvo', 'hyundai' ]

// ? 메서드 체이닝
// : 메서드를 연속적으로 호출하는 프로그래밍 기법(패턴)
// - 어떤 메서드(기능)가 반환하는 값을 기반으로 또 다른 메서드를 줄줄이 사용하는 것

let numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// 1) numbersArray에서 짝수만 선택 - filter
// 2) 해당 짝수들의 값을 제곱 - map
// 3) 해당 제곱값들을 콘솔에 출력 - forEach

let a = numbersArray.filter(value => value % 2 === 0);
console.log(a); // [ 0, 2, 4, 6, 8 ]

let b = a.map(value => value * value);
console.log(b); // [ 0, 4, 16, 36, 64 ]

let c = b.forEach(value => console.log(value));
// 0
// 4
// 16
// 36
// 64

// 위의 a, b, c 를 아래의 "메서드 체이닝" 형식으로 작성할 수 있음
numbersArray
  .filter(value => value % 2 === 0)
  .map(value => value * value)
  .forEach(value => console.log(value));