// * 1. 할 일 타입 정의 - 인터페이스
interface Task {
  id: number;
  description: string; 
  timestamp: Date;
}

// * 2. Task 저장소의 구조 - 클래스
// : 할 일에 대한 저장소(배열)와 기능(함수) 명시
class TaskLogger {
  private tasks: Task[] = [];
  private taskIdCounter = 0;

  addTask(description: string): Task {
    const newTask: Task = {
      id: this.taskIdCounter++,
      description, // 변수명만 사용하면 변수명자체가 key 가 됨
      timestamp: new Date()
    }

    this.tasks.push(newTask);
    this.renderTasks();
    return newTask;
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.renderTasks();
  }

  private createTaskElement(task: Task) {
    const taskItem = document.createElement('div');

    taskItem.className = 'task-item';
    taskItem.innerHTML = `
      <span>${task.description} - ${task.timestamp.toLocaleDateString()}</span>
      <button data-task-id=${task.id}>Delete</button>
    `;
    // "data-task-id" 라는 사용자 정의 속성 추가하는 역할
    // 각 버튼이 어떤 task.id 를 가지고 있는지 알려주는 역할로,
    // button.dataset.taskId 로 값을 읽어올 수 있음

    return taskItem;
  }

  private renderTasks() {
    const taskList = document.getElementById('task-list');

    if(taskList) {
      taskList.innerHTML = '';
      this.tasks.forEach(task => {
        const taskItem = this.createTaskElement(task);
        taskList.appendChild(taskItem);
      });

      this.addDeleteEventListeners();
    }
  }

  private addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.task-item button');

    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const taskId = parseInt((e.target as HTMLButtonElement).dataset.taskId || '0'
          , 10);

        this.deleteTask(taskId);
      });
    });
  }
} 

// * 프로젝트 실행의 진입점
const init = (): void => {
  const taskManager = new TaskLogger();

  const logTaskButton = document.getElementById('log-task-button');
  const taskModal = document.getElementById('task-modal');
  const closeModalButton = document.querySelector('.close');
  const addTaskButton = document.getElementById('add-task-button');
  const taskInput = document.getElementById('task-input') as HTMLInputElement;

  if(logTaskButton) {
    logTaskButton.addEventListener('click', () => {
      if(taskModal) {
        taskModal.style.display = 'block';
        taskInput.focus();
      }
    });
  }

  if(closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      if(taskModal) {
        taskModal.style.display = 'none';
      }
    });
  }

  window.addEventListener('click', (e) => {
    // 이벤트가 발생된 요소 범위가 modal 내부의 modal-content 가 아니라, 실질적인 taskModal 인 경우를 확인하기 위해서
    if(e.target === taskModal) {
      if(taskModal) {
        taskModal.style.display = 'none';
      }
    }
  });

  const handleAddTask = () => {
    const description = taskInput.value;
    if(description && description.trim() !== '') {
      taskManager.addTask(description.trim());
      taskInput.value = '';

      taskModal!.style.display = 'none'; // 느낌표(!) 로 if 조건문 검증 대신함
    } else {
      alert('Task 설명은 필수값입니다. 내용을 입력해주세요.');
    }
  };

  // 물음표(?) 로 if 조건문 대신
  addTaskButton?.addEventListener('click', handleAddTask);

  taskInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      handleAddTask();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);