// mainPractice.ts

/*
! 요구사항 정리

1. 사용자가 "Fetch User Data" 버튼을 클릭
2. "Loading user data" 메시지가 화면에 표시
3. 실제 데이터 요청이 실행되고, 완료되면 사용자 데이터가 화면에 표시
4. 요청이 실패하거나 문제가 발생하면, 에러 메시지가 화면에 표시
*/ 

//# 'fetchUserData' id를 가진 HTML 요소에 클릭 이벤트 리스너 추가
const fetchButton = document.getElementById('fetchUsesrData');

fetchButton?.addEventListener('click', async() => {
  const userDataDiv = document.getElementById('userData');
  const userIdElement = document.getElementById('userId') as HTMLInputElement;

  const userId = userIdElement ? userIdElement.value : '';
  
  const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;

  if(userDataDiv) {
    userDataDiv.innerHTML =  `<p>Loading user Data</p>`;
  }
});

//* -----로딩 메시지 표시-----

//* try-catch 블럭을 사용하여 비동기 작업 처리(데이터 불러오기)

//? async / await 사용
// - async의 경우 이벤트 리스너의 콜백함수로 설정
// - await의 경우 fetch() 작업으로 명시

//? 사용자의 응답이 올바르지 못할 경우
// if(!fetchResponse.ok)
// : 사용자 에러 발생

//? 가져온 데이터를 json() 타입으로 변환

//? 사용자 데이터 표시 userDataDiv의 내부 HTML(.innerHTML)
// <h2>User Details</h2>
// <p>Id: ${user.id}</p>
// <p>Name: ${user.name}</p>
// <p>Email: ${user.email}</p>
// <p>Username: ${user.username}</p>
// <p>Address: ${user.address.street}, ${user.address.city}</p>

//? 비동기 작업 처리 중 오류 발생 시 (catch)
// userDataDiv에 에러 표시(.innerHTML)