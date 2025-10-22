// % 프로그램 기능 정의
// : jsonplaceholder 의 데이터를 사용하여 posts 게시물 데이터 가져오기
// > 외부와의 연결: 데이터 경로가 올바르지 않을 경우 - 예외 처리
// > 데이터를 정상적으로 가지고 온 경우 - DOM 요소 생성 + 출력

// : 검색 (필터링)
//  >> input 창에 입력되는 내용이 posts 의 내용에 존재하는 경우,
//    해당 내용만 필터링 되어 출력

// +) 비동기 처리: async, await 사용

// 사용자의 게시글을 비동기적으로 가져오는 함수 정의
async function fetchPosts(userId) {
  // JSONPlaceholder - REST API 사용
  // ? 특정 userId 의 게시글 모두 조회
  // https://jsonplaceholder.typicode.com/posts?userId=${userId}
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

  if(!response.ok) {
    throw new Error('네트워크 응답에 문제가 있습니다.');
  }
  return response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  // 비동기 처리가 필요한 함수가 포함된 반환을 사용하는 함수는 비동기처리를 해야함
  const userId = 1; // 사용할 특정 사용자의 id 를 정의
  
  // ! HTML 요소 불러오기
  const postsController = document.getElementById('posts');
  const searchInput = document.getElementById('search-input');
  const errorDiv = document.getElementById('error');

  let allPosts = []; // 게시글 저정할 배열 초기화

  try {
    // % 초기 게시글 로드(비동기, fetch 함수)
    allPosts = await fetchPosts(userId);

    displayPosts(allPosts);
  } catch (e) {
    showError('데이터를 불러오는 중 오류가 발생하였습니다.');
  }

  // % 게시글을 화면에 표시하는 함수
  function displayPosts(posts) {
    postsController.innerHTML = '';

    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
      postsController.appendChild(postDiv);
    });
  }

  // % 검색 입력 필드에 입력이 있을 때마다 실행되는 이벤트 리스너 추가
  searchInput.addEventListener('input', () => {
    const searchTerms = searchInput.value.trim().toLowerCase();

    // 1) 검색어가 없는 경우
    if(!searchTerms) {
      displayPosts(allPosts);
      clearError(); // 검색어 내용없으면 에러를 제거
      return;
    }

    // 2) 검색어가 있는 경우
    const filteredPosts = filterPosts(allPosts, searchTerms);

    if(filteredPosts.length === 0) {
      showError('일치하는 포스트가 없습니다.');
    } else {
      displayPosts(filteredPosts);
      clearError();
    }
  });

  // % 게시글을 필터링 하는 함수
  function filterPosts(allPosts, searchTerms) {
    return allPosts.filter(post => post.title.toLowerCase().includes(searchTerms) 
    || post.body.toLowerCase().includes(searchTerms));
  }

  // % 에러메시지 표시 함수
  function showError(message) {
    errorDiv.textContent = message;
  }

  // % 에러메시지 삭제 함수
  function clearError() {
    errorDiv.textContent = '';
  }
});
