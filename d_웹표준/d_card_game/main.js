// ! 카드 메모리 게임 (카드 매칭 게임)
// : 사용자가 카드를 클릭하여 뒤집고, 같은 색상의 카드를 매칭시키는 게임

// +) 게임 초기화, 카드 뒤집기, 매칭 검사
//    , 게임 완료 확인 등의 기능을 포함

// # 문서의 로딩이 완료되면 함수 실행
document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('card-container');

  const startButton = document.getElementById('start-button');
  const resetButton = document.getElementById('reset-button');
  const completedButton = document.getElementById('completed-button');

  // % 색상 배열 정의 (6개)
  const colors = [
    "#cc3131",
    "#e3ddbb",
    "#23b923",
    "#34bcbc",
    "#3939db",
    "#e5b7e4",
  ];

  // % colors 배열의 색상을 복제하여 새로운 배열 cardColors 생성
  // ? 스프레드(...) 연산자 사용 (깊은 복사)
  let cardColors = [...colors, ...colors];

  // % 1. 게임을 초기화하는 함수
  // 1) cardColors 색상 배열 섞기
  // 2) 해당 색상을 cardContainer 내부의 HTML(.card-back)에 배치
  // 3) 12개의 카드를 생성하면 요소 할당
  
  function initializeGame() {
    shuffle(cardColors);

    // ? cardContainer 내부의 HTML 초기화: 게임 새로 시작시 기존의 카드를 제거
    cardContainer.innerHTML = '';

    // ? 12개 카드를 for 반복문으로 생성하여 HTML 요소로 할당
    for(let i = 0; i < 12; i++) {
      cardContainer.innerHTML += `
      <div class="card">
          <div class="card-inner">
            <div class="card-front">
              <img src="./front.jpg" alt="카드의 앞면">
            </div>
            <div class="card-back" style="background-color: ${cardColors[i]};"></div>
          </div>
        </div>
      `;
    }

    // ? 12 장의 각 카드에 이벤트 리스너를 추가하는 함수 호출
    addCardEventListener();
  }

  // % 2. 시작시 잠시동안 모든 카드의 뒷명(색상)을 공개하는 함수 정의
  function revealCardsTemporary() {
    // 완료 버튼을 비활성화해야함 (카드가 뒤집힐 당시에 사용자의 컨트롤을 막는 로직)
    // ? DOM 요소에 속성 지정
    // DOM요소.setAttribute(속성, 속성값)
    // DOM요소.속성명 = 속성값;

    completedButton.disabled = true; // disabled 속성: 요소에 대한 컨트롤의 비활성화를 지정

    // ? 모든 카드 뒤집기(뒷면 공개)
    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
        card.classList.add('flipped');
      });
    }, 100); // 0.1초 뒤에 뒤집기

    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped'); // 원래 상태로 되돌려놓기
      });
      // ? 완료 버튼 다시 활성화
      completedButton.disabled = false;

    }, 2000); // 2초 뒤에 복구

  }

  // % 3. 모든 카드 요소에 클릭 이벤트 리스너를 추가하는 함수
  function addCardEventListener() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', flipCard);
    });
  }

  // ? 전역 변수 선언
  // 1) 게임 시작 상태 추적 변수
  // : 시작 버튼과 재시작 버튼에 대한 이벤트 리스너에 활용
  let isGameStarted = false;

  // 2) 카드가 뒤집혔는지 여부
  let hasFlippedCard = false;  // 첫번째 카드를 뒤집었는지 여부 검사

  // 3) 첫번째, 두번째 카드
  let firstCard, secondCard;

  // 4) 게임판 잠김 염부
  let isLocked = false; // 잠기지 않은 것이 기본값

  // % 4. 카드를 뒤집는 함수
  function flipCard() {
    if(!isGameStarted || isLocked) return;
    
    if(this === firstCard) return;

    // ? this 키워드
    //  : 함수 선언문에서 this 는 해당 함수가 실행된 객체 그 자체임
    // 여기서 this 는 card 를 의미, 클릭된 .card DOM 요소
    // addEventListener('click', filpCard) 로 이벤트가 걸려있을때 그 이벤트를 발생시킨 DOM 요소를 가리키는 것
    this.classList.add('flipped');

    if(!hasFlippedCard) { 
      hasFlippedCard = true; // 첫번째 카드를 뒤집었다 표시
      firstCard = this; // 클릭된 카드를 첫번째 카드로 저장
      return; // 함수 종료 (두번째 클릭은 아직 없음)
    } else {
      hasFlippedCard = false; // false 로 초기화하고 다음 턴 준비
      secondCard = this; // 이번에 클릭한 카드를 두번째 카드에 저장
    }

    // 두카드가 일치하는지 확인
    checkForMatch();
  }  

  // % 5. 두카드가 일치하는지 확인하는 함수 정의
  function checkForMatch() {
    // A요소.querySelector(''): A요소 내부의 선택자검색
    if(!firstCard || !secondCard) return;

    let isMatch = 
      firstCard.querySelector('.card-back').style.backgroundColor 
      === secondCard.querySelector('.card-back').style.backgroundColor;
    
    isMatch ? disabledCards() : unflipCards();
  }

  // % 6. 매치된 카드를 처리하는 함수 정의
  function disabledCards() {
    // 카드를 뒤집는 기능을 제거
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // ? 새로운 카드가 담길 수 있도록 초기화 
    resetBoard();
  }

  // % 7. 매치되지 않은 카드를 다시 뒤집는 함수 정의
  function unflipCards() {
    isLocked = true; // 게임판 잠금

    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000);

  }

  // % 8. 게임판 변수 초기화 함수
  function resetBoard() {
    [hasFlippedCard, isLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // % 9. 버튼 가시성 토글 함수
  function toggleButtonVisiblity(isGameStarted) {
    // 게임 시작여부가 true 면: 시작버튼 안보이는 상태
    startButton.style.display = isGameStarted ? 'none' : 'block';

    // 게임 시작여부가 false 면: 재시작, 완료버튼이 안보이는 상태
    resetButton.style.display = isGameStarted ? 'block' : 'none';
    completedButton.style.display = isGameStarted ? 'block' : 'none';
  }

  // # 각 버튼에 대한 이벤트 핸들러 등록
  let gameStartTime;

  // % 시작버튼
  startButton.addEventListener('click', () => {
    initializeGame();

    gameStartTime = new Date();

    toggleButtonVisiblity(true);

    revealCardsTemporary();

    isGameStarted = true;
  });

  // % 재시작 버튼
  resetButton.addEventListener('click', () => {
    initializeGame();

    gameStartTime = new Date();

    toggleButtonVisiblity(true);

    revealCardsTemporary();;
    isGameStarted = true;

  });

  // % 완료버튼 
  completedButton.addEventListener('click', () => {
    // 모든 카드가 뒤집혀져 있는지 확인
  
    // every() 메서드
    // 콜백함수를 인자로 받는 배열 메서드
    // - 배열의 모든 메서드가 주어진 함수 조건식을 만족할 때 (true 값일 경우) true 반환
    // - 모든 카드 요소에 flipped 클래스 속성이 존재하면 모두 뒤집어져있는 상태를 뜻함
    const allFlipped = Array.from(document.querySelectorAll('.card')).every(
      card => card.classList.contains('flipped')
    );

    // ? document.querySelectorAll('');
    // >> 배열과 '비슷한' 객체 (NodeList 객체)
    // >> 따라서 배열 메서드 사용시 실질적인 배열로 변환을 해야함
    // Array.from(NodeList) 를 사용하여야 .map(), .every(), .filter() 등이 사용가능

    if(allFlipped) {
      const gameTime = new Date() - gameStartTime;
      alert(`게임 완료! 소요시간: ${Math.floor(gameTime / 1000)} 초`);

      isGameStarted = false;

      initializeGame();
      toggleButtonVisiblity = false;
    } else {
      alert('게임이 완료되지 않았습니다.');
    }
  });

  // 버튼 표시 - 초기에는 시작 버튼만 표시
  toggleButtonVisiblity(false);

  // 게임 초기화 & 화면 렌더링
  initializeGame();
});

// # 배열의 요소를 무작위로 섞는 함수 
// : 매번 게임을 새로 시작할 때 카드 배치 순서가 달라짐
function shuffle(array) {
  // 배열의 마지막 요소부터 시작하여 첫 번째 요소까지 역순으로 반복
  let length = array.length;

  // ? 현재요소(i) 와 무작위로 선택된 요소(j)의 위치 교환
  for(let i = length - 1; i > 0 ; i--) {
    // Math.random() * (i + 1) : 0 부터 i 까지 무작위 인데스 생성
    let j = Math.floor(Math.random() * (i + 1));

    // ? 구조 분해 할당 
    // : 배열의 i 번째 요소와 j번째 요소를 서로 바꿈
    [array[i], array[j]] = [array[j], array[i]];
    // ex) i: 11, j: 8 -> i: 8, j: 11 서로 바꿈

    // ? '피셔-에이츠 셔플'의 알고리즘 기법
  }
}