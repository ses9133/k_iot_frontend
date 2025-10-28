// ======================================================
// 🧾 할 일(Task) 관리 시스템 (TypeScript 기반)
// - 모달창을 통해 할 일을 추가하고 목록에 표시
// - 각 항목의 삭제 버튼을 누르면 해당 할 일을 제거
// ======================================================

// * 1️⃣ Task 타입 정의 (인터페이스)
// ------------------------------------------------------
// - 각 할 일(Task)이 어떤 속성들을 가지는지를 정의
// - id: 각 Task를 구분하기 위한 고유 번호
// - description: 할 일의 내용(문자열)
// - timestamp: 생성 시간 (Date 객체)
interface Task {
  id: number;
  description: string;
  timestamp: Date;
}


// * 2️⃣ Task 저장소 클래스 정의 (TaskLogger)
// ------------------------------------------------------
// - 모든 할 일 데이터를 배열로 저장하고
// - 추가(add), 삭제(delete), 렌더링(render) 등의 기능을 수행
// - 내부 배열은 private 으로 외부 접근 차단
class TaskLogger {
  // 모든 Task 객체들을 저장할 배열
  private tasks: Task[] = [];

  // 고유한 ID 생성을 위한 카운터
  private taskIdCounter = 0;


  // ✅ (1) addTask(description)
  // - 새로운 Task를 생성하고 배열에 추가
  // - description을 인자로 받아 새 Task 객체를 생성
  // - id는 taskIdCounter를 증가시키며 자동 부여
  // - timestamp는 현재 시간(new Date())
  // - Task를 배열에 추가한 뒤 renderTasks()로 화면 갱신
  // - 최종적으로 생성된 Task 객체를 반환
  addTask(description: string): Task {
    // 새 Task 객체 생성
    const newTask: Task = {
      id: this.taskIdCounter++,       // 고유 id 부여
      description,                    // 할 일 내용
      timestamp: new Date()           // 현재 시간 기록
    };

    // 배열에 추가 후 렌더링 갱신
    this.tasks.push(newTask);
    this.renderTasks();

    return newTask;
  }


  // ✅ (2) deleteTask(taskId)
  // - 전달받은 taskId와 일치하지 않는 항목만 남기도록 필터링
  // - 즉, 클릭된 Task를 배열에서 제거
  // - 이후 renderTasks()를 다시 호출하여 목록 갱신
  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.renderTasks();
  }


  // ✅ (3) createTaskElement(task)
  // - Task 객체 1개를 받아 HTML 요소로 변환
  // - <div class="task-item"> 내에
  //    <span>과 <button> 요소를 동적으로 생성
  // - 버튼에는 "data-task-id" 속성을 부여하여
  //   어떤 Task를 삭제해야 하는지 식별 가능하도록 함
  private createTaskElement(task: Task) {
    // div 요소 생성
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    // 내부 내용 구성
    taskItem.innerHTML = `
      <span>${task.description} - ${task.timestamp.toLocaleDateString()}</span>
      <button data-task-id=${task.id}>Delete</button>
    `;

    // data-task-id → dataset.taskId 로 접근 가능
    // 이 값으로 어떤 Task가 클릭되었는지 판단할 수 있음
    return taskItem;
  }


  // ✅ (4) renderTasks()
  // - 화면의 #task-list 요소를 찾아 현재 tasks 배열을 기반으로 UI 갱신
  // - 기존 목록을 비우고(createTaskElement로 생성된 div를 다시 append)
  // - 마지막에 삭제 버튼 이벤트 연결(addDeleteEventListeners 호출)
  private renderTasks() {
    const taskList = document.getElementById('task-list');

    if (taskList) {
      taskList.innerHTML = ''; // 기존 목록 초기화

      // 배열의 모든 Task를 HTML 요소로 변환 후 append
      this.tasks.forEach(task => {
        const taskItem = this.createTaskElement(task);
        taskList.appendChild(taskItem);
      });

      // 삭제 버튼 이벤트 다시 등록
      this.addDeleteEventListeners();
    }
  }


  // ✅ (5) addDeleteEventListeners()
  // - .task-item 내부의 모든 Delete 버튼을 찾아
  //   클릭 이벤트를 등록
  // - 클릭된 버튼의 data-task-id 값을 읽어 해당 Task 삭제 실행
  private addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.task-item button');

    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // 이벤트가 발생한 버튼 요소를 HTMLButtonElement로 단언
        const taskId = parseInt(
          (e.target as HTMLButtonElement).dataset.taskId || '0', 10
        );

        // 읽어온 id로 Task 삭제
        this.deleteTask(taskId);
      });
    });
  }
}



// * 3️⃣ 프로젝트 초기 실행 함수 (init)
// ------------------------------------------------------
// - DOMContentLoaded 시 실행되는 앱의 진입점
// - 버튼 클릭, 모달 표시/숨김, 입력 이벤트 등을 담당
const init = (): void => {
  // TaskLogger 인스턴스 생성
  const taskManager = new TaskLogger();

  // 주요 DOM 요소 가져오기
  const logTaskButton = document.getElementById('log-task-button'); // "Task 기록" 버튼
  const taskModal = document.getElementById('task-modal');          // 모달창 전체
  const closeModalButton = document.querySelector('.close');        // 모달 닫기(X)
  const addTaskButton = document.getElementById('add-task-button'); // "Task 추가" 버튼
  const taskInput = document.getElementById('task-input') as HTMLInputElement; // 입력 필드


  // ✅ (1) "Task 기록" 버튼 클릭 시 모달 열기
  if (logTaskButton) {
    logTaskButton.addEventListener('click', () => {
      if (taskModal) {
        taskModal.style.display = 'block'; // 모달창 표시
        taskInput.focus();                 // 입력창에 포커스
      }
    });
  }


  // ✅ (2) 모달 닫기(X) 버튼 클릭 시 닫기
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      if (taskModal) {
        taskModal.style.display = 'none';
      }
    });
  }


  // ✅ (3) 모달 바깥 영역 클릭 시 모달 닫기
  // - window 전체에 클릭 이벤트를 등록하고,
  // - e.target이 실제 모달(taskModal) 요소 자체인 경우에만 닫기
  //   (내부의 modal-content 영역 클릭은 무시)
  window.addEventListener('click', (e) => {
    if (e.target === taskModal) {
      if (taskModal) {
        taskModal.style.display = 'none';
      }
    }
  });


  // ✅ (4) handleAddTask() 함수
  // - 입력값 검증 후 Task 추가 및 모달 닫기
  // - 입력값이 비어 있으면 경고창 표시
  const handleAddTask = () => {
    const description = taskInput.value;

    if (description && description.trim() !== '') {
      // Task 추가
      taskManager.addTask(description.trim());

      // 입력창 초기화 및 모달 닫기
      taskInput.value = '';
      taskModal!.style.display = 'none'; // 느낌표(!): null이 아님을 보장
    } else {
      alert('Task 설명은 필수값입니다. 내용을 입력해주세요.');
    }
  };


  // ✅ (5) "Task 추가" 버튼 클릭 시 handleAddTask 실행
  // - ?. (옵셔널 체이닝): addTaskButton이 존재할 때만 실행
  addTaskButton?.addEventListener('click', handleAddTask);


  // ✅ (6) 입력창에서 Enter 키 누를 시 Task 추가
  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  });
};


// * 4️⃣ DOMContentLoaded 이벤트 등록
// ------------------------------------------------------
// - HTML 문서가 완전히 로드된 후 init() 실행
document.addEventListener('DOMContentLoaded', init);
