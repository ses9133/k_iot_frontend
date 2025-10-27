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

// [요구사항 정리]
// 1) 특정 id 를 가진 Todo 항목의 task 를 편집하는 함수(editTodo)
function editTodo(todos: TodoItem[], id: number, newTask: string) {
  const newTodo = todos.map(todo => todo.id === id ? {...todo, task: newTask} : todo);
  return newTodo;
}

// 2) 완료된 Todo 항목을 모두 삭제하는 함수 (clearCompleted)
function clearCompleted(todos: TodoItem[], completed: boolean) {
  const completedTodos = todos.filter(todo => !todo.completed);
  return completedTodos;
}

// 3) 모든 Todo 항목을 조회하는 함수(getAllTodos)
function getAllTodos(todos: TodoItem[]) {
  return todos;
}

// 4) 특정상태(completed) 에 따라 Todo 항목을 필터링하는 함수(filterTodos)
function filterTodos(todos: TodoItem[], completed: boolean) {
  const filterdTodos = todos.filter(todo => todo.completed === completed);
  return filterdTodos;
}

// 5) 특정 id 를 가진 Todo 항목의 completed 상태를 토글하는 함수(toggleTodo)
function toggleTodo(todos: TodoItem[], id: number) {
  const todoList = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
  return todoList;
}

// 6) 모든 Todo 항목의 completed 상태를 일괄적으로 설정하는 함수(setAllTodosCompletion)
function setAllTodosCompletion(todos: TodoItem[], completed: boolean) {
  const newTodos = todos.map(todo => (
    { ...todo, completed : completed })
  );
  return newTodos;
}

// * 프로그램 구현
let todos: TodoItem[] = [
  { id: 1, task: "abc", completed: false },
  { id: 2, task: "def", completed: true },
  { id: 3, task: "ghi", completed: false },
  { id: 4, task: "jkl", completed: false },
  { id: 5, task: "mno", completed: true },
  { id: 6, task: "pqr", completed: false },
  { id: 7, task: "stu", completed: true },
  { id: 8, task: "vwx", completed: true },
  { id: 9, task: "yz", completed: false },
];

console.log('task 편집');
todos = editTodo(todos, 1, 'aaa');
console.log(todos);

// console.log('완료된 todo 삭제');
// todos = clearCompleted(todos, true);
// console.log(todos);

console.log('todos 목록 출력');
console.log(getAllTodos(todos));
getAllTodos(todos)

console.log('false 인 todo 조회');
let filteredTodo = filterTodos(todos, false);
console.log(filteredTodo);

console.log('true 인 todo 조회');
let filteredTodo2  = filterTodos(todos, true);
console.log(filteredTodo2);

console.log(toggleTodo(todos, 2));

todos = setAllTodosCompletion(todos, true);
console.log(todos);

// * 프로그램 실행
