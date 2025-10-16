// review01.js

//# Todo 리스트 만들기 (할 일 목록 관리 시스템) //

//! Todo 객체 구성
// - id: 각 할 일의 고유 식별자 (주로 "숫자"나 문자열로 표현)
// - content: 할 일의 내용 (문자열)
// - completed: 할 일의 완료 상태 (불리언)

/*
- Todo 객체 예시 (리터럴)

let todo =  {
  id: 1,
  content: '정보처리기사 실기 원서 접수',
  completed: false
}
*/

// ! 프로젝트 개요 === //
// 'Todo' 객체 데이터에 대한 CRUD 가능

// 1. 할 일 추가: 객체를 사용하여 할 일을 저장하고 배열에 객체를 추가
//    >> 새로운 할 일(객체)을 목록(배열)에 추가

// 2. 할 일 수정: 완료된 할 일의 completed 값을 전환(toggle)

// 3. 할 일 삭제: 지정하는 할 일을 목록에서 제거

// 4. 할 일 목록 출력: 현재 목록의 상태를 콘솔에 출력(R: 전체 조회)

// ! === 프로젝트 구현 == //
let todos = []; // 배열 리터럴 방식 선언(빈 배열) - 할 일 목록을 저장할 배열 초기화
let wastebasket = []; // 휴지통 (삭제된 할 일 저장소)
let nextId = 1; // 고유ID 값을 위한 전역 변수

// 1) 할 일 추가 함수
function addTodo(content) { 
  const newTodo = {
    id: nextId,
    content: content,
    completed: false
  };

  // 다음 할 일 추가시 사용할 고유ID 값 (전역변수) 증가
  nextId++;

  // 할 일을 목록에 추가
  todos.push(newTodo);

  // 현재까지의 todo 리스트를 출력하는 함수
  displayTodo();
}


// 2) 할 일 수정 함수: 완료 상태를 변경
//    : 수정하고자 하는 특정 할 일의 id를 매개변수로 전달받아 '완료 상태 전환'(토글)
function toggleTodo(id) {
  // 전체 할 일 목록 중 id값과 일치하는 할 일만 완료 상태 전환
  // ? map: 배열을 순회하여 동일한 기능 적용 후 새로운 배열에 담아 반환

  // ? 콜백함수를 가지는 배열의 메서드 'forEach, map, filter' 
  //    > 콜백함수의 인자로 (value, index, array): 순서 중요  ex) (, index)
  todos = todos.map(todo => {
    
    // id 값 일치 여부 확인
    if(todo.id === id) {
      // cf) 스프레드 연산자 사용
      // : 객체나 배열의 내부 요소만 추출하는 연산자
      
      // let arr1 = [1 ,2 ,3];
      // let arr2 = [...arr1]; >> 깊은 복사로 새로운 배열 생성 (서로 메모리 주소 다름)

      // let obj1 = { a: 1, b: 2 };
      // let obj2 = { ...obj1 }; >> 깊은 복사로 새로운 객체 생성 (서로 메모리 주소 다름)
      
      // ? +) 객체의 속성 변경
      // 객체명.속성키 = 속성값;
      // - 해당 속성키가 존재하는 경우: 객체 속성 값 재할당
      // - 해당 속성키가 존재하지 않는 경우: 객체 속성이 새로 생성됨
      // obj1.a = 3; - 재할당
      // obj1.c = 4; - 해당 값을 가진 키가 새로 생성됨

      // let obj3 = {...obj1, b: 22}; - obj1 객체를 복사해서 새로운 객체를 만들고, b 속성의 값을 22로 할당한다

      return { 
        ...todo, completed: !todo.completed
      }
    }
     return todo; // id 가 일치하지 않는 데이터는 기존 객체 그대로 반환
  });

  displayTodo();
}

// 3) 할 일 삭제 함수
//  : 삭제하고자 하는 id를 가진 할 일을 todos 배열에서 제거
//    >> 배열 내부 요소에서 제거 (요소 개수 변화가 일어남 -> filter 함수 사용)
function deleteTodo(id) {
  const idx = todos.findIndex(todo => todo.id === id);
  if(idx === -1) {
    console.log(`id ${id}는 없습니다.`);
    return; // 함수 종료
  }

  // splice(시작인덱스, 삭제요소개수, 추가요소개수) - 삭제 또는 추가 하여 배열 반환
  const [removed] = todos.splice(idx, 1); // ! 구조 분해 할당 - removed 를 상수로써 사용 가능
  wastebasket.push(removed);

  // 1, 2, 3, 4, 5 중에서 4를 제거
  // -> 4 와 일치하지 않는 1, 2, 3, 5 로 새로운 배열 생성 (=> 4가 삭제된것과 동일한 형태)
  todos = todos.filter(todo => todo.id !== id);
  displayTodo(); 
}

// +) 할 일 복수/비우기 기능 함수
function restoreTodo(id) {
  const idx = wastebasket.findIndex(waste => waste.id === id);

  if(idx === -1) {
    console.log(`휴지통에 id ${id} 가 없슴`);
    return;
  }

  const [restored] = wastebasket.splice(idx, 1);
  todos.push(restored);
  displayTodo();
} 

// 4) 할 일 출력 함수
function displayTodo() {
  console.log('=== 현재의 할 일 목록 ===');
  todos.forEach(todo => {
    // 삼함 연산자 버전
    console.log(`${todo.id}: ${todo.content} - ${todo.completed ? '완료됨' : '완료되지 않음'}`);

    // 논리 연산자 버전: 완료시 ☑️ 기호를 출력
    // console.log(`${todo.id}: ${todo.content} ${todo.completed && '☑️'}`);
    // completed(true 면 완료됨): ☑️ 출력 
  })
}

// +) 휴지통 비우기
function removeAllWatsteBasket() {
  wastebasket.length = 0;
}

// ! === 프로젝트 실행 ===
addTodo('자바스크립트 복습하기!');
addTodo('미니 프로젝트 HTML/CSS 끝내기');
addTodo('자바 복습');
addTodo('이력서 사진찍기');

toggleTodo(3);
toggleTodo(1);

deleteTodo(1);
deleteTodo(3);