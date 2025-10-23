// 실습파일.js

// DOMContentLoaded 이벤트가 발생하면 함수 실행
document.addEventListener("DOMContentLoaded", () => {
  // secretNumber 변수에 1부터 100까지의 랜덤 숫자를 저장
  let secretNumber = Math.floor(Math.random() * 100) + 1; 

  // attempts 변수에 시도 횟수를 저장, 초기값은 0
  let attempts = 0;

  // 결과를 표시할 요소를 가져옴
  const result = document.getElementById('result');

  // 사용자의 추측을 입력받을 input 요소를 가져옴
  const input = document.getElementById('guessInput');

  // 추측 제출 버튼을 가져옴
  const submitButton = document.getElementById('submitButton');

  // 게임을 리셋할 버튼을 가져옴
  const resetButton = document.getElementById('resetButton');

  // 추측 제출 버튼에 클릭 이벤트 리스너 추가, checkGuess 함수 호출
  // submitButton.addEventListener('click', () => {
  //   checkGuess();
  // });
  submitButton.addEventListener('click', checkGuess);

  // 리셋 버튼에 클릭 이벤트 리스너 추가, resetGame 함수 호출
  // resetButton.addEventListener('click', () => {
  //   resetGame();
  // });
  resetButton.addEventListener('click', resetGame);

  // 사용자의 추측을 확인하는 함수
  function checkGuess() {
    // 입력된 추측 값을 정수로 변환하여 guess 변수에 저장
    let guess = Number(input.value.trim());

    // 시도 횟수를 1 증가
    attempts++;

    // 사용자의 추측이 정답인 경우
      // `정답입니다. 시도 횟수: ${attempts}번`;
    if(guess === secretNumber) {
      result.innerHTML = `정답입니다. 시도 횟수: ${attempts}번`;
    }

    // 사용자의 추측이 정답보다 큰 경우
      // `입력값: ${guess} >> 높습니다. 낮춰주세요.`;
    if(guess > secretNumber) {
      result.innerHTML = `입력값: ${guess} ➡️ 높습니다. 낮춰주세요.`;
    }

    // 사용자의 추측이 정답보다 작은 경우
      // `입력값: ${secretNumber} >> 낮습니다. 높여주세요.`;
    if(guess < secretNumber) {
      result.innerHTML = `입력값: ${guess} ➡️ 낮습니다. 높여주세요.`;
    }

  }

  // 게임을 초기화하는 함수
  function resetGame() {
    // 새로운 랜덤 숫자를 secretNumber에 저장
    // 시도 횟수를 0으로 초기화
    // 입력 필드를 비움
    // 결과 표시를 초기화
    secretNumber = Math.floor(Math.random() * 100) + 1; 
    attempts = 0;
    input.value = '';
    result.innerHTML = '';
  }
});