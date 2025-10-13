// ! 1. 배열 합계 구하기
let array = [1,  2, 3, 4, 5];

function sumArray(array) {
  let sum = 0; // 배열의 요소 합을 저장

  let length = array.length;
  for(let i = 0; i < length; i++) {
    sum += array[i];
  }

  return sum;
}

console.log(sumArray(array)); // 15
console.log(sumArray([24, 31, 75, 90])); // 220

// ! 2. 특정 수 이상의 요소 필터링 하여 새로운 배열로 반환
function filterTen(array) {
  let filteredValue = []; // 10 이상의 값을 담는 배열

  let length = array.length;

  for(let i = 0; i < length; i++) {
    if(array[i] >= 10) {
      filteredValue.push(array[i]);
    }
  }
  return filteredValue;
}

console.log(filterTen([1, 10, 100, 4])); // [ 10, 100 ]

// ! 3. 배열의 평균 구하기 
// - findAverage(array)
// : 평균 === 전체요소의 합 / 요소의 개수
function findAverage(array) {
  let length = array.length
  let sum = 0;

  for(let i = 0; i < length; i++) {
    sum += array[i];   
  }

  return sum / length;
}

console.log(findAverage([1, 2, 3, 4, 5])); // 3

// ! 4. 배열 내의 최대값 찾기
// - findMax(array)
// : 배열의 첫번째 요소를 max 라는 변수에 담기
// : 배열을 순회하면서 max 보다 큰 값이 있을 경우 max 를 해당값으로 재할당
function findMax(array) {
  let length = array.length;
  let max = array[0];

  for(let i = 1; i < length; i++) {
    if(array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

console.log(findMax([-1, -9, 100])); // 100





