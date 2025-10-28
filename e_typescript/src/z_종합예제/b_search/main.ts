// https://jsonplaceholder.typicode.com/users
// * 비동기를 사용한 사용자 정보 조회 & 검색, 필터링 기능 ==

// * 1. User 인터페이스 정의(사용자 정보 지정)
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// * 2. UsersType 타입 별칭 정의(사용자 정보를 저장하는 배열 타입)
type UsersType = User[];

// * 3. 사용자 정보를 외부 API 에서 가져오는 비동기 함수
// async 함수의 반환타입 : Promise 객체 
  // Promise.resolve(value)
  // : async 함수는 내부에서 어떤 값을 반환하든 자동으로 Promise.resolve(데이터)로 감싸서 반환
  /*
    예)
    async function test() {
      return 123;
    }

    실제 반환값은 123 이 아니라 Promise<number> 로, Promise.resolve(데이터값) 이 자동으로 감싸져서 반환됨
  */
  // > Promsie 반환이 성공(resolve), 실패면 reject
const fetchUsers = async(): Promise<UsersType> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if(!response.ok) {
      throw new Error('네트워크 응답 실패');
    }
    const users: UsersType = await response.json();
    return users;
  
  } catch (e) {
    console.error('Fetch Error: ', e);
    return [];
  }
}

// * 4. 사용자 정보를 받아 HTML 요소를 생성하는 함수
const createUserCard = (user: User): HTMLElement => {
  const userCard = document.createElement('div');
  userCard.innerHTML = `
    <h2>${user.name}</h2>
    <p>Username: ${user.name}</p>
    <p>Email: ${user.email}</p>
  `;

  return userCard;
}

// * 5. 사용자 정보 배열을 받아서 화면에 표시하는 함수
// createUserCard 에 각 객체 전달
const displayUsers = (users: UsersType) => {
  const userList = document.getElementById('user-list');
  if(userList) {
    userList.innerHTML = '';
    users.forEach(user => {
      const userCard = createUserCard(user);
      userList.appendChild(userCard);
    });
  }
}

// * 6. 사용자 정보 필터링하는 함수
// 사용자로부터 입력받은 검색어 사용
// 사용자의 name, username, email 중 하나라도 포함된 경우 출력
const filterUsers = (users: UsersType, query: string): UsersType => {
  return users.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) 
    || user.username.toLowerCase().includes(query.toLowerCase()) 
    || user.email.toLowerCase().includes(query.toLowerCase()) 
  );
} 

// * 7. 사용자 정보 정렬하는 함수
// : Name 또는 Email 기준으로 정렬
const sortUsers = (users: UsersType, key: 'name' | 'email'): UsersType => {
  // map, filter: 배열 메서드, 새로운 배열 반환
  // cf) sort(): 배열 요소 정렬 (+ 콜백 함수 사용, 새로운 배열 반환 X - 정렬된 같은 배열 객체 자체를 반환)

  return [...users].sort((a, b) => a[key].localeCompare(b[key])); 
  // 배열.sort();
  // : 콜백함수를 받는 배열 요소 정렬 메서드
  // : 콜백함수의 인자는 비교할 데이터의 2가지를 입력
  // cf) a, b 는 데이터 객체(User 인터페이스 타입)
  // ex) a[name].localeCompare(b[name]), a[email].localeCompare(b[email])

  // - 문자열.localCompare()
  // : 문자열을 비교하는 메서드 (알파벳 순 정렬에 유용)
  // - 문자열 내림 차순 정렬시,
  // - sort((a, b) => b[key].localeCompare(a[key])); - 순서바꾸기
  // - 반환값 -1: 기준 문자열(a) 이 비교 문자열(b) 보다 앞에 있음
  //          0: 같음
  //          1: 기준 문자열이 비교 문자열보다 뒤에 있음
}

// * 이벤트 리스너 추가 함수
const addEventListeners = (users: UsersType) => {
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;

  const dataFilterAndSort = () => {
    // 데이터 필터링
    const query = searchInput.value;
    const filteredUsers = filterUsers(users, query);

    // 필터링된 데이터 정렬
    const sortKey = sortSelect.value as 'name' | 'email';
    const sortedUsers = sortUsers(filteredUsers, sortKey);

    displayUsers(sortedUsers);
  }

  searchInput.addEventListener('input', dataFilterAndSort);
  sortSelect.addEventListener('change', dataFilterAndSort);
}

// * 초기화 함수
const init = async (): Promise<void> => {
  const users = await fetchUsers();

  displayUsers(users);
  addEventListeners(users);
}

document.addEventListener('DOMContentLoaded', init);