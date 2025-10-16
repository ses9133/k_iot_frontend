// # 장바구니 시스템 정의 //

// ! === 프로그램 데이터 정의 ===
// 장바구니(cart)
// 1) id - 상품의 고유 식별자(숫자)
// 2) name - 상품 이름(문자)
// 3) price - 상품 가격 (숫자)
// 4) quantity - 사용자가 선택한 해당 상품의 수량(숫자)

/*
  - Cart 객체 예시(리터럴)

  let product = {
    id: 1.
    name: 'banana',
    price: 6900,
    quantity: 2
  }
*/

// ! === 프로그램 기능 정의 === //
// : 장바구니의 각 제품에 대한 CRUD
// +) 추가 기능 - 장바구니에 이미 존재하는 상품이면 수량 업데이트
//    수정 기능 - 특정 상품의 수량 업데이트
//    장바구니 제품들의 총합 계산

// ! === 프로그램 구현 === //
let cart = [];

// ? 1. 장바구니에 상품 추가
function addToCart(id, name, price, quantity) {
  // 장바구니내 상품 존재 여부 확인
  const index = cart.findIndex(item => item.id === id);

  if(index > -1) { //상품이 이미 장바구니에 존재하는 경우
    cart[index].quantity += quantity; 
  } else { // 상품이 장바구니에 없을 경우

    // let newItem = {
    //   id: id,
    //   name: name,
    //   price: price,
    //   quantity: quantity
    // } -> 이렇게 작성도 가능

    cart.push({id, name, price, quantity});
  }

  displayCart();
}

// ? 2. 장바구니 내의 모든 상품을 조회
function displayCart() {
  console.log('=== Cart Contents ===');
  cart.forEach(item => {
    console.log(`ID: ${item.id}, ${item.name} - Price: $${item.price}, Quantity: ${item.quantity}`);
    console.log(`Total: ${item.name}'s Price: ${item.price * item.quantity}`);
  })
}

// ? 3. 특정 상품의 수량을 변경
function updateQuantity(id, quantity) {
  const idx = cart.findIndex(item => item.id === id);

  // 상품이 존재하고 변경할 수량이 0 보다 커야만 상품 업데이트 가능
  if(idx > -1 && quantity > 0) {
    cart[idx].quantity += quantity;
  } else {
    console.log('유효하지 않은 상품이거나 수량이 0보다 커야 합니다.');
  }

  displayCart();
}

// ? 4. 특정 상품을 삭제
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  displayCart();
}

// ? 5. 장바구니 총합 계산
// : 전체 배열의 요소를 순회하여 단일한 값을 도출 (reduce)
// > 배열.reduce((acc, value, idx, array) => {}, 초기값)
function calculateTotal() {
  let total = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0);

  console.log(`Cart Total Price: ${total}`);
}

// ? 6. 장바구니 전체 상품 삭제
function clearCart() {
  cart = []; 
  // 또는
  // cart.length = 0;
  console.log('Cart is cleared!');
}

addToCart(1, '연필', 1000, 3);
addToCart(2, '지우개', 1500, 4);

updateQuantity(2, 4);

addToCart(1, '연필', 1400, 4);

removeFromCart(1);

calculateTotal();
clearCart();
displayCart();