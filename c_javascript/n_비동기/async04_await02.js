// # await 코드에서 비동기 기능 제외한 경우

function fetchCustomerData() {
  try {
    let data = fetch('https://jsonplaceholder.typicode.com/users/1');  
    console.log(data); // Promise { <pending> }
//     fetch()는 바로 네트워크 요청을 시작하면서
// “나중에 Response를 줄게”라는 **약속(Promise)**만 반환
// 즉, 아직 서버로부터 응답(Response)이 오지 않은 **미완료 상태(pending)**
// Promise가 “fulfilled” 상태가 될 때 비로소 Response 객체가 생성되어 .ok, .json() 등을 사용할 수 있게 됨

    if(!data.ok) {
      throw new Error('네트워크 응답이 실패되어 데이터를 정상적으로 가져오지 못하였습니다.');
    }

    let jsonData = data.json();
    console.log(jsonData);

  } catch (error) {
    console.log('에러메시지 출력');
    console.error('Error: ' + error);
  }
}

fetchCustomerData();