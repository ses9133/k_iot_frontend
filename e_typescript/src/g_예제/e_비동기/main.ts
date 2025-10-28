// * JSONPlaceholder 의 photos 데이터 사용
// https://jsonplaceholder.typicode.com/photos?albumId=1

// * 요구사항 정리
// 1. 각 페이지에 photos 데이터의 사진 4개씩 첨부
// : 50개의 데이터를 각 페이지에 4개씩 첨부
// : 50 === (4 * 12) + 2

// 2. 각 사진의 이름(title)은 사진 아래 작성(p태그)

// 3. 페이지 간 이동은 버튼(Previous, Next) 으로 작동

// * photo 객체 타입 정의
type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

let currentPage = 1; // 현재 페이지 번호를 추적(기본값1 - 첫페이지)
const photoPerPage = 4; // 한 페이지 당 표시할 사진 개수

async function fetchPhotos(page: number) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=1');

    if(!response.ok) {
      throw new Error('데이터를 가져오는데에 실패하였습니다.');
    } 

    const photos: PhotoType[] = await response.json();

    // * slice(시작인덱스, 끝인덱스): 배열의 메서드, 특정 부분(시작인덱스부터 끝 인덱스 직전까지)을 새로운 배열로 반환

    // 1페이지: 0 ~ 3 인덱스 (slice(0, 4))
    // 2페이지: 4 ~ 7 인덱스 (slice(4, 8))
    // 3페이지 : 8 ~ 11 ...
    // (page - 1) * photoPerPage: 시작 인덱스
    // page * photoPerPage: 끝 인덱스

    return photos.slice((page - 1) * photoPerPage, page * photoPerPage);
    
  } catch (e) {
      console.error('Failed');
      return [];
    }
}

// * 사진을 렌더링하는 함수: 4개씩 나누어진 사진 배열을 매개변수로 받음
function renderPhotos(photos: PhotoType[]) {
  const container = document.getElementById('photo-container') as HTMLElement; // HTMLElement 로 타입단언하면 null 값 방지할수있음(즉, if 문 통해 검증 생략 가능)

  container.innerHTML = '';

  // 각 사진에 대한 HTML 요소 생성
  photos.forEach(photo => {
    const photoElements = document.createElement('div');

    photoElements.className = 'photo-item';
    photoElements.innerHTML = `
      <img src='${photo.thumbnailUrl}' alt='${photo.title}' />
      <p>${photo.title}</p>
    `;

    container.appendChild(photoElements);
  });
}

// * 전체 프로젝트 실행
async function updatePhotos() {
  const photos = await fetchPhotos(currentPage);

  if(currentPage === 13) {
    const nextBtn = document.getElementById('next-button') as HTMLButtonElement;
    nextBtn.style.visibility = 'hidden';
  }
  renderPhotos(photos);
}

updatePhotos();

// * 
document.addEventListener('DOMContentLoaded', () => {
  const currentPageNumber = document.getElementById('page-number') as HTMLElement;
  currentPageNumber.textContent = `${currentPage}`;

  // * 버튼 이벤트 등록
document.getElementById('prev-button')!.addEventListener('click', () => {
  // 이벤트가 등록될 DOM 요소에 대한 단언 (!, 느낌표 사용)
  if(currentPage > 1) {
    currentPage--;
    currentPageNumber.textContent = `${currentPage}`;
    updatePhotos();
  }
});

document.getElementById('next-button')!.addEventListener('click', () => {
  if(currentPage < 13) {
  currentPage++;
  currentPageNumber.textContent = `${currentPage}`;
  updatePhotos();
  }
});

});
