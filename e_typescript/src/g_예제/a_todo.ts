// * 타입스크립트로 TODO 리스트 구현
/*
[데이터 구조]
  - 여러 개의 할 일을 저장할 수 있는 배열
  - 각 할 일은 객체
  ex) 상품들 배열 내에 상품 객체, 회원들 배열에 회원 객체
  할일들 배열(TodoItem[])에 할일 객체(TodoItem)

  cf) 배열 타입 정의: 요소타입[]

[요구사항 정리]
  1. Todo(할일 객체) 항목의 인터페이스 정의(TodoItem)
    : id(고유값, number), task(할 일 내용, string), completed(완료 여부, boolean)
  
  2. 각 할일들 todos 배열로 관리

  3. 할 일 리스트를 관리하는 함수 구현
  - addTodo(추가)
  - completedTodo(수정-완료여부)
  - deleteTodo(삭제)
*/

// * 할 일의 객체 인터페이스 명시
interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

// * 할 일 추가 함수
function addTodo(todos: TodoItem[], task: string): TodoItem[] {
  const newTodo: TodoItem = {
    // id 값은 기존의 Todo 항목 중에서 가장 큰 id 값에 1을 더해 새로운 id 생성 (중복방지)

    // * Math.max(): 인자로 주어진 숫자중에서 가장 큰 수 반환
    // - 인자 내에 배열이 있으면 배열 요소 중 가장 큰 값을 반환

    // todos.map(todo => todo.id)
    /*
      [
        { id: 1, task: 'a', completed: true },
        { id: 1, task: 'a', completed: true },
        { id: 1, task: 'a', completed: true },
      ]
      -> 
      [1 ,2 ,3]
    */
    id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
    // 스프레드 사용하여 인자로 펼쳐야함
    task: task,
    completed: false
  }

  // * 기존의 할 일 목록에 새로운 할 일 추가
  // : 깊은 복사 사용(스프레드 연산자) + 새로운 요소
  // > 새로운 배열 생성 
  // >> 배열의 주소값이 변경되어 리액트에서 인지 가능해짐
  const newTodos = [...todos, newTodo];

  // cf) todos.push(newTodo); 도 가능하지만 리액트에서는 이렇게 안씀
  //  > 배열의 불변성(배열은 첫번째 요소의 주소값이 저장됨)

  return newTodos;
}

// * 할 일 수정 함수(완료 여부 토글)
function completedTodo(todos: TodoItem[], id: number) {
  // 변화된 배열(새로운 주소값 반환 - 변화 인지)
  const changeTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed} : todo);

  return changeTodos;
}

// * 할 일 삭제
function deleteTodo(todos: TodoItem[], id: number) {
  const changeTodos = todos.filter(todo => todo.id !== id);
  return changeTodos;
}

// * 함수 사용
let todos: TodoItem[] = [];

todos = addTodo(todos, '타입스크립트공부');
todos = addTodo(todos, 'JS공부');
todos = addTodo(todos, '자격증공부');
todos = addTodo(todos, '스프링공부');

console.log(todos);

todos = completedTodo(todos, 1);
todos = completedTodo(todos, 2);
console.log(todos);

todos = deleteTodo(todos, 1);
todos = deleteTodo(todos, 4);
console.log(todos);

todos = addTodo(todos, '웹 표준 공부');
console.log(todos);