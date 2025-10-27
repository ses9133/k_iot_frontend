// * 타입 속성 정의
// Task 타입을 제네릭으로 정의 
type Task<T> = {
  id: number;
  task: T;
  completed: boolean;
}

// TaskManager 클래스
// : T 제니릭 타입의 할 일 목록을 관리
class TaskManager<T> {
  // 1) 속성
  tasks: Task<T>[];
  nextId: number;

  // 2) 생성자
  constructor() {
    this.tasks =[];
    this.nextId = 1;
  }

  // 3) 메서드
  // 1. 할 일 추가 (addTask)
  addTask(content: T): void {
    this.tasks.push({
      id: this.nextId,
      task: content,
      completed: false
    });
    this.nextId++;

    this.updateTaskCount(); 
  }

  // 2. 할 일 삭제(removeTask)
  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.renderTasks('task-list'); // 삭제된 요소가 반영된 렌더링
    this.updateTaskCount();
  }

  // 3. 할 일 목록 렌더링(renderTasks)
  // 매개변수) 렌더링할 DOM 요소의 id 속성 값
  renderTasks(taskListId: string): void {
    const taskList = document.getElementById(taskListId) as HTMLUListElement;
    // taskListId 변수 안에 들어있는 문자열을 id로 가진 요소를 찾는 코드
    
    taskList.innerHTML = '';
    this.tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.task}`;
    
      // 삭제버튼 생성
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '삭제';

      deleteButton.onclick = () => {
        this.removeTask(task.id);
      }

      // 완료 체크 박스 추가
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;

      // 체크 박스 상태 변경시: checked 속성 변경 지정
      checkbox.onchange = () => {
        task.completed = !task.completed;
        this.renderTasks(taskListId);
      }// onchange -> 변화 있을 시

      if(task.completed) {
        li.style.textDecoration = 'line-through';
      }

      // 생성된 요소를 부모 요소의 제일 마지막에 추가
      li.appendChild(deleteButton);

      // A요소.insertBefore(B요소, A요소.firstChild);
      // : A요소안에 B 요소를 삽입
      // : 내부의 첫번째 요소보다 전에 앞선 배치됨
      li.insertBefore(checkbox, li.firstChild); // textContent 내용보다 앞선 배치

      taskList.appendChild(li);
    });

    this.updateTaskCount();
  }

  // 4. 할 일 개수 업데이트 함수(updateTaskCount)
  updateTaskCount() {
    const countElement = document.getElementById('task-count');
    if(countElement) {
      countElement.textContent = `할 일 개수: ${this.tasks.length}`;
    }
  }
}

// * TaskManager 객체 생성(프로젝트 실행)
document.addEventListener('DOMContentLoaded', () => {
  const taskManager = new TaskManager<string>();

  const addButton = document.getElementById('add-button') as HTMLButtonElement;
  const newTaskInput = document.getElementById('task-input') as HTMLInputElement;

  addButton.addEventListener('click', () => {
    if(newTaskInput.value.trim() !== '') {
      taskManager.addTask(newTaskInput.value);
      taskManager.renderTasks('task-list');

      newTaskInput.value = '';
    }
  });

});