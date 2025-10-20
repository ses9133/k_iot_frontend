// 사칙 연산 함수 정의
export default function subtract(a, b) {
  return a - b;
}

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export let divide = (a, b) => {
  if(b !== 0) {
    return a / b;
  } else {
    console.log('0 으로 나누면 무한대의 수가 생성됩니다.');
  }
}