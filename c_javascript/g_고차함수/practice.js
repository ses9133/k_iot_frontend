// # 배열 메서드 _+ 콜백 함수 //

// 1번 문제
// 다음 배열을 조건에 따라 작성하고 실행했을 때의 결과를 확인하시오.
const scores = [75, 83, 95, 64, 100, 55, 43];

function passingScores(scores) {
  // Q) 60점이 넘는 점수의 개수와 평균을 하나의 배열로 반환

  // 1) 60점이상인 점수를 필터링
  const passing = scores.filter(score => score >= 60);

  // 2) 60점 이상인 점수의 개수: .length
  const passingCount = passing.length;

  // 3) 60점 이상인 점수들의 평균
  const passingAvg = passing.reduce((acc, score) => acc + score, 0)  / passingCount;

  return [passingCount, passingAvg];
} 

const result = passingScores(scores);
console.log(result);

// const passingCountValue = result[0];
// const passingAvgValue = result[1];

// ! cf) 구조 분해 할당
// : 배열이나 객체의 각 요소를 한 번에 각 변수에 할당
// 변수종류 [변수명1, 변수명2, ...] = [값1, 값2, ...];
// 변수종류 [변수명1, 변수명2, ...] = 배열명;
const [aa, bb, cc] = [1, 2, 3];
console.log(`${aa}, ${bb}, ${cc}`); // 1, 2, 3

// +) 구조 분해 할당에서 좌항의 배열 내 변수는 변수 선언과 같음
//    >> 구조 분해 할당된 배열안의 각 요소는 개별적인 변수와 동일
const [passingCountValue, passingAvgValue] = result; // 25, 26번째 const 로 선언했기때문에 재선언하면 오류남

console.log(passingCountValue); // 5
console.log(passingAvgValue); // 83.4

// +) 구조 분해 할당은 '변수 선언 + 초기화' 동시에 이루어짐

// ! 2번 문제 
// 주어진 배열을 사용하여 문제를 해결하시오
const numbers = [1, 2, 3, 4, 5];

// 각 요소의 10을 더하고 홀수값 만을 새로운 배열에 담아 출력 (메서드 체이닝 형식 사용)
const newNum = numbers
  .map(number => number + 10)
  .filter(number => number % 2 !== 0);

console.log(newNum); // [ 11, 13, 15 ]

// ! 3번 문제
// 주어진 배열을 사용하여 문제를 해결하시오
const words = ['apple', 'monkey', 'banana',' pig', 'grape', 'elephant'];

const filtered = (words, substring) => {
    // 1) 첫번째 인자: 배열
    // 2) 두번째 인자: 필터링할 단어
    // >> words(배열)의 각 단어 중 substring(문자열)이 포함된 단어만 필터링하여 반환

    // +) includes() 메서드 활용: 문자열.includes(문자)
    //    >> 배열, 문자열 등에서 데이터 인자값이 포함되어있는지를 검사(boolean 반환)
    return words.filter(word => word.includes(substring));
}

console.log(filtered(words, 'a')); // [ 'apple', 'banana', 'grape', 'elephant' ]
console.log(filtered(words, 'ap')); // [ 'apple', 'grape' ]

const containA = filtered(words, 'a');
console.log(containA); // [ 'apple', 'banana', 'grape', 'elephant' ]