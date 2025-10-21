// % 1. Promise 정의
//  : 비동기 작업의 완료 또는 실패를 나타내는 객체
// - 기존의 콜백 방식보다 가독성이 좋음
// - 아직 결과가 정해지지 않았지만, 미래의 결과를 약속하는 객체

// % 2. Promise 상태 (3가지)
// 1) 대기(Pending)
//  : 초기 상태, 작업이 아직 완료되지 않음(비동기 연산이 완료되지 않음)

// 2) 이행 (fullfilled - 성공)
//  : 작업 성공 (비동기 연산이 성공/완료)
// - Promise 가 결과값을 반환한 상태 (resolve(결과값) 호출)

// 3) 거부 (rejected - 실패)
//  : 작업 실패 (비동기 연산이 실패)
// - Promise 가 에러를 반환한 상태 (reject(에러) 호출)

// % 3. Promise 생성 및 사용법 (기본 구조)
// : new Promise() 생성자 함수를 사용
// - Promise 내부에 콜백 함수로 비동기 작업이 완료되었을 때의 후속 동작을 정의
//    >> 인자로 (성공시함수, 실패시함수) 전달!
//      resolve(value): 프로미스 이행 상태로 변경, 결과값은 value 로 반환
//      reject(error): 프로미스 실패 상태로 변경, 결과값은 error 반환

const myPromise = new Promise((resolve, reject) => {
  // 비동기로 수행될 작업 작성
  const condition = false;

  if(condition) { // 작업 성공 조건
    resolve('프로미스 성공!');
  } else {
    reject('프로미스 실패');
  }
});

// ! 프로미스 메서드 사용
// : new Promise() 를 통해 생성된 프로미스 객체 내부의 메서드

// 1) .then(): 그러고 나면
// - 성공시(resolve) 실행되는 콜백 함수
// - resolve(..) 의 반환값이 첫 번째 then(result) 의 매개변수 result 로 전달됨

// 2) .catch(): 잡는다
// - 실패시(reject) 실행되는 콜백 함수
// - reject(..) 의 반환값이 catch(error) 의 배개변수 error 로 전달됨

// 3) .finally(): 마침내
// - 성공과 실패 관계없이 항상 실행되는 콜백 함수

// ? 메서드 체이닝 (연결) 방식 사용
myPromise
  // 첫번째 실행문
  // resolve('프로미스 성공!') 이 실행되면, 이 값이 첫번째 then() 의 매개변수(result) 로 전달됨
  .then((result) => {
    console.log(result);
    return '다음 실행시 필요한 데이터';
    // 리턴값은 다음 then() 의 매개변수(nextResult) 로 넘어감
  })
  // 두번째 실행문...
  .then((nextResult) => {
    console.log(nextResult);
    return '세번째 실행시 필요한 데이터'
  })
  // N번째 실행문
  .then((thirdResult) => {
    console.log(thirdResult);
  })
  .catch((error) => {
    // reject() 값으로 매개변수 error 에 전달
    console.log(error);
  })
  .finally(() => {
    // finally 매개변수 없음
    console.log('무조건 실행');
  });

// ! 프로미스 예시 (체이닝 & 에러) 
// '데이터 가져오기'
function fetchUserData() {
  return new Promise((res, rej) => {
    setTimeout(() =>  res('데이터 가져오기 성공'), 2000);
  });
}

// '데이터 처리하기'
function processUserData(data) {
  return new Promise((res, rej) => {
    setTimeout(() => res(`${data} 사용하기`), 2000);
  });
}

fetchUserData()
  .then(result => processUserData(result))
  .then(processResult => console.log(processResult)) 
  .catch(error => console.error(error));

// ? console.error(): 웹 콘솔에 에러메시지 출력

console.log('메인 로직의 실행');
// 메인 로직의 실행
// 데이터 가져오기 성공 사용하기  순으로 출력
