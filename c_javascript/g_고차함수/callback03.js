// === 콜백 함수를 활용하는 JS 의 내장함수 === //

// ! 배열의 콜백 함수 메서드

// 4) reduce()
// : 배열의 각 요소에 대해 함수를 적용하여 단일 값을 생성 (하나의 값)
// - 누적값으로 단일 결과 도출

// ? array.reduce((acc, value, index, array) => {...}, initialValue);
// acc(accelerate): 누적값 (이전 반환값)
//    >> 각 순회마다 축적되는 값(이전 작업물의 반환값, 첫 번쨰 호출시에는 '초기값' 지정)

// - initialValue: 초기 누적값(생략시 첫 요소가 초기 acc 가 됨)

// cf) 기존 콜백 함수의 인자: value, index, array

let numbers = [1, 2, 3, 4];

let sum = numbers.reduce((acc, value) => acc + value, 0);

// sum 을 풀어서 쓴다면 (초기값 100 으로 변경하는 경우)
let sum2 = numbers.reduce(function(acc, value) {
  return acc + value;
}, 100);

console.log(sum); // 10
console.log(sum2); // 110

// === reduce === //
let cars = ['audi', 'bmw', 'hyudai', 'volvo'];

let combinedCar = cars.reduce((acc, car) => {
  return acc + car + ", ";
}, "Cars: ");
console.log(combinedCar); // Cars: audi, bmw, hyudai, volvo,
console.log(typeof combinedCar); // string

// ! === 기타 배열의 고급 메서드 === ! //
let numberArray = [3, 4, 1, 2, 4, 6, 7];

// 1) sort(), reverse(): 정렬 메서드
console.log(numberArray.sort());
// [
//   1, 2, 3, 4,
//   4, 6, 7
// ]
console.log(numberArray.reverse());
// [
//   7, 6, 4, 4,
//   3, 2, 1
// ]

// 2) indexOf(), lastIndexOf(): 특정 요소의 인덱스를 찾는 메서드
// 3) find() : 특정 조건을 만족하는 첫 번째 요소 >> 존재하지 않으면 undefined 반환
// 3) findIndex():  첫번째 요소의 인덱스를 반환 >> 존재하지 않으면 -1 반환
let nums = [5, 2, 6, 3, 5, 7];
let firstOverSix = nums.find(num => num > 6);
console.log(firstOverSix); // 7

let firstOverSix1 = nums.find(num => num > 3);
console.log(firstOverSix1); // 5 (해당 조건을 만족하는 가장 첫번째 요소를 반환)

let test = nums.find(num => num < 0);
console.log(test); // undefined

let firstOverEightIndex = nums.findIndex(num => num > 8);
console.log(firstOverEightIndex); // -1

let firstOverEightIndex2 = nums.findIndex(num => num > 4);
console.log(firstOverEightIndex2); // 0 (해당 조건을 만족하는 가장 첫번째 요소의 인덱스를 반환)
