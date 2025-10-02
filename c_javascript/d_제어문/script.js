// === 구구단 출력기
// 사용자로부터 정수값을 입력받으면 해당 값의 구구단을 출력

// while 문 조건식에 true 에 대한 boolean값 적용시 무한 루프
//   >> break; 키워드로 사용자 정의 종료

while(true) {
  const input = prompt('출력할 구구단의 숫자를 입력하세요(2~9) // "exit" 를 입력하시면 종료됩니다.');

  if(input.toLowerCase() === 'exit') {
    console.log('프로그램을 종료합니다.');
    break;
  }

  const number = Number(input);
  
  if(number >= 2 && number <= 9) {
    console.log(`=== ${number}단 ====`);

    for(let i = 1; i <= 9; i++) {
      console.log(`${number} X ${i} = ${number * i}`);
    }
  } else {
    console.log('1에서 9사이의 숫자를 입력해주세요');
  }
  
}