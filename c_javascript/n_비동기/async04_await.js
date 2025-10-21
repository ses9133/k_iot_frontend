// # async & await
// 두 개 항상 같이 써야함
// - async 키워드로 정의된 함수내에서 await 키워드를 사용
// Promise 가 끝날때까지 기다려주는 문법
// await: Promiser 가 완료될 때 까지 기다리고, 그 결과(Response)를 꺼냄. 
// > 비동기 작업이 완료될 때 까지 await의 실행을 일시적으로 멈춤

// ! async 함수 구조
// : 함수 자체를 비동기 함수로 정의하는 키워드
// 작성법: async function 함수명() { ... }
// >> 항상! Promise 객체를 반환

// +) async 함수 내부에서 await 키워드를 사용하여 Promise 의 결과를 기다림
async function fetchUserData() {
  // ? fetch('url - http://api.example.com/api/v1/user') 함수
  // 해당 url 을 사용하여 서버와 통신을 하는 기능
  // : Promise<Response> 객체를 반환
  // : 바로 Response 를 주는 함수가 아니라, Response 를 미래에 줄 것을 약속하는 Promise 를 즉시 반환하는 함수

  let data = await fetch('http://api.example.com/api/v1/user'); // 시간이 걸리는 작업(통신) > await 사용

  let jsonData = await data.json(); // 가져온 JSON 데이터를 JS 객체로 변환, 비동기로 가져온 작업을 처리할 때도 비동기 처리해야함(await 작성)

  console.log(jsonData);
}

// % async, await 특징
// : 비동기적 코드를 동기적으로 작성 (가독성 향상)
// : async 함수 내에서만!! await 키워드 사용 가능
// : 하나의 async 함수 내에서 여러 개의 await 사용 가능

// ! 비동기 작업 예시 (+ 예외 처리)
// : 외부와 연결되는 작업은 주로 '비동기 작업' 으로 작성
// +) 예외 처리 코드와 함께 사용할 것을 권장

async function fetchCustomerData() {
  try {
    // 실제 로직이 구현되는 블록
    let data = await fetch('https://jsonplaceholder.typicode.com/users/1');  // fetch() 함수: Response 객체를 반환
    
    if(!data.ok) {
      throw new Error('네트워크 응답이 실패되어 데이터를 정상적으로 가져오지 못하였습니다.');
    }

    // .json(): json 데이터를 parse 하여 JS 객체로 반환
    let jsonData = await data.json();
    console.log(jsonData);

  } catch (error) {
    // try 블럭에서 에러 발생시 해당 에러를 매개변수로 받아 처리

    // ? cer: console.error();
    console.log('에러메시지 출력');
    console.error('Error: ' + error);
  }
}

fetchCustomerData();

// % fetch() 함수
// : 네트워크 요청을 비동기적으로 처리
// - HTTP 응답을 나타내는 Promise 객체를 반환 (성공시 resolve 값이 Response 객체)
//                                        (실패시 reject 값에 예외가 담김 - 네트워크 자체가 실패했을 때만 발생!)

// % Response 객체
// 1) ok
// : HTTP 상태 코드가 200 ~ 299 범위에 있을 때 true 반환
// > 요청이 성공적으로 완료되었음을 반환

// 2) status
//  : 응답의 HTTP 상태 코드를 반환 (ex) 200, 404, 500 등)

// 3) statusText
//  : 응답의 HTTP 상태 코드에 대한 텍스트 메시지 반환
// ex) OK, NOT FOUND, SERVER ERROR 등...

// 4) headers: 응답의 헤더를 나타냄, 응답의 메타데이터나 특정 값을 포함

// 5) body: 응답 본문, 해당 데이터를 .json() 으로 사용하여 데이터 추출
//    >> 응답의 기본값 JSON 형식