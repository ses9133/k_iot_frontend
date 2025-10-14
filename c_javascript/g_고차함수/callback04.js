// === 콜백 함수를 활용하는 JS 의 내장함수 === //

// ! 타이머 함수 (비동기 콜백)
// : 특정 시간 이후에 함수를 실행하거나 일정 간격으로 함수를 반복 실행 가능하게 하는 함수

// ? cf) 비동기
//    : 작업이 끝날 때까지 기다리지 않고 다음 코드를 바로 실행하는 방식
//    > 콜백 함수는 다른 함수의 인자로 전달되어 특정 시점에 실행되는 함수
//    > 비동기 콜백 함수는 비동기 작업이 완료된 후 실행되는 콜백 함수
//      : 나중에 실행될 일을 미리 등록해두는 것

// 1) setTimeout(콜백함수, 시간);
//  - 콜백함수: 지정된 시간 이후에 '단 한번만' 실행될 함수
//  - 시간: 밀리초(ms) (1s === 1000ms) 단위로 사용

function runlater(name = '정은혜') {
  console.log(`Hello, ${name} 님`);
}
runlater(); // Hello, 정은혜 님 - 동기프로그래밍

setTimeout(runlater, 2000); // 2초후 Hello, 정은혜 님

// setTimeout(runlater('정세이'), 2000); // TypeError [ERR_INVALID_ARG_TYPE]: The "callback" argument must be of type function. Received undefined
// ! 콜백함수의 인자는 undefined 여야만 한다 !

// ! cf) 콜백함수의 인자 전달 방법
// : 세 번째 인자부터 나열되는 값이 함수의 매개변수로 전달
setTimeout(runlater, 3000, '정세이'); // 첫번째 runlater 가 호출되고 3초 후에, Hello, 정세이 님

// cf) 함수 호출: 함수명(인자나열...);
//  > 호출부 () 작성시 코드를 읽는 즉시 함수 실행
//setTimeout(runlater(), 3000, '김항미'); // TypeError [ERR_INVALID_ARG_TYPE]: The "callback" argument must be of type function. Received undefined
// ! 호출부 (즉, 소괄호) 작성시 함수를 지금 바로 호출하라는 의미인데 setTimeout은 3초후 실행하게 하는 함수여서 서로 로직에 맞지 않음. -> setTimeout 함수 작성시 실행함수의 호출부 작성하지 않음

function manyParam(name, age, job) {
  console.log(`${name} is ${age} years old, job: ${job}`);
}

setTimeout(manyParam, 100, '정은혜', 29, 'developer'); // 정은혜 is 29 years old, job: developer - 첫번째 runlater (19번째) 실행되고 0.1 초 후 실행됨

// 화살표함수로 작성하는 법
setTimeout(() => console.log('3초뒤 실행'), 3000); // 3초뒤 실행]

// ! 타이머 취소 함수: clearTimeout(타이머ID);
// : 등록된 타이머를 취소할 때 사용
// - setTimeout 으로 예약된 코드 실행을 중단하거나 무효화할 때 사용

// cf) 타이머 ID 는 타이머 함수 호출시 반환
const timeId = setTimeout(() => console.log('타이머 ID 확인용'), 5000);
console.log(timeId);

clearTimeout(timeId); // 타이머 ID 확인용 메시지 출력 안됨

// ! setInterval(콜백함수, 시간)
// : 지정된 시간 간격마다 함수를 반복해서 실행
//  >> 사용법 setTimeout 과 유사

let count = 1;
let id = setInterval(() => {
  console.log(`3초마다 실행됩니다. ${count} 번째`);
  count++;
}, 3000); // 3초 '마다' 실행

// 제거시 타이머id 가 필요하므로, "let id = " 로 변수값 대입해주고,
setTimeout(() => {
  console.log('타이머를 종료합니다.');
  clearInterval(id);
}, 15000); // 15 초 후에 종료

// 터미널 종료 : ctrl + C