// ! == 기능 구현 ==

// 1) thumb-bar 의 이미지 클릭시 -> 해당 이미지로 full-img 변경

// 2) button 태그 클릭시 
// -> 다크모드 버튼 일 경우: 
// 버튼의 class 속성을 dark 로 지정, button.textContent = 라이트모드
// , overlay 배경색을 rgba(0, 0, 0, 0.5); 로 

// -> 라이트모드 버튼일 경우, 
// 버튼의 class 속성을 light 로 지정, button.textContent = 다크모드
// , overlay 배경색을 rgba(0, 0, 0, 0); 로

// ! 1) HTML 요소 선택
const thumbBar = document.querySelector('.thumb-bar');
const displayedImage = document.querySelector('.displayed-img');
const button = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// ! 2) 썸네일 바에 이벤트 리스너 추가
thumbBar.addEventListener('click', (e) => {
  // cf) target vs currentTarget
  // - target: 실제 이벤트가 발생한 요소
  // - currentTarget: 이벤트 핸들러가 등록된 요소(thumbBar)

  // 클릭된 요소가 이미지인 경우
  if(e.target.tagName === 'IMG') {
    // 요소.tagName: 해당 요소의 태그명이 전체 대문자로 반환
    const imgSrc = e.target.src;
    displayedImage.src = imgSrc;
  }
});

// ! 3) 다크 / 라이트 버튼 기능 구현
button.addEventListener('click', () => {
  // 클래스 속성으로 현ㅈ ㅐ상태를 확인 
  // : 해당 요소의 클래스 리스트에 dark 가 있는지 확인
  
  // 요소.classList.add/remove/contains('클래스속성');
  if(button.classList.contains('dark')) {
    // 현재 다크모드 버튼이 띄워져있는상태 (화면은 라이트모드인 상태)
    button.textContent = '라이트모드';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    button.classList.remove('dark');
  } else {
    // 현재 라이트 모드 버튼 띄워져있는상태 (화면은 다크모드인 상태)
    button.textContent = '다크모드';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    button.classList.add('dark');
  }
})