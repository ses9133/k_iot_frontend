// * 2. Task 저장소의 구조 - 클래스
// : 할 일에 대한 저장소(배열)와 기능(함수) 명시
var TaskLogger = /** @class */ (function () {
    function TaskLogger() {
        this.tasks = [];
        this.taskIdCounter = 0;
    }
    TaskLogger.prototype.addTask = function (description) {
        var newTask = {
            id: this.taskIdCounter++,
            description: description, // 변수명만 사용하면 변수명자체가 key 가 됨
            timestamp: new Date()
        };
        this.tasks.push(newTask);
        this.renderTasks();
        return newTask;
    };
    TaskLogger.prototype.deleteTask = function (taskId) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== taskId; });
        this.renderTasks();
    };
    TaskLogger.prototype.createTaskElement = function (task) {
        var taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = "\n      <span>".concat(task.description, " - ").concat(task.timestamp.toLocaleDateString(), "</span>\n      <button data-task-id=").concat(task.id, ">Delete</button>\n    ");
        return taskItem;
    };
    TaskLogger.prototype.renderTasks = function () {
        var _this = this;
        var taskList = document.getElementById('task-list');
        if (taskList) {
            taskList.innerHTML = '';
            this.tasks.forEach(function (task) {
                var taskItem = _this.createTaskElement(task);
                taskList.appendChild(taskItem);
            });
            this.addDeleteEventListeners();
        }
    };
    TaskLogger.prototype.addDeleteEventListeners = function () {
        var _this = this;
        var deleteButtons = document.querySelectorAll('.task-item button');
        deleteButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                var taskId = parseInt(e.target.dataset.taskId || '0', 10);
                _this.deleteTask(taskId);
            });
        });
    };
    return TaskLogger;
}());
// * 프로젝트 실행의 진입점
var init = function () {
    var taskManager = new TaskLogger();
    var logTaskButton = document.getElementById('log-task-button');
    var taskModal = document.getElementById('task-modal');
    var closeModalButton = document.querySelector('.close');
    var addTaskButton = document.getElementById('add-task-button');
    var taskInput = document.getElementById('task-input');
    if (logTaskButton) {
        logTaskButton.addEventListener('click', function () {
            if (taskModal) {
                taskModal.style.display = 'block';
                taskInput.focus();
            }
        });
    }
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function () {
            if (taskModal) {
                taskModal.style.display = 'none';
            }
        });
    }
    window.addEventListener('click', function (e) {
        // 이벤트가 발생된 요소 범위가 modal 내부의 modal-content 가 아니라, 실질적인 taskModal 인 경우를 확인하기 위해서
        if (e.target === taskModal) {
            if (taskModal) {
                taskModal.style.display = 'none';
            }
        }
    });
    var handleAddTask = function () {
        var description = taskInput.value;
        if (description && description.trim() !== '') {
            taskManager.addTask(description.trim());
            taskInput.value = '';
            taskModal.style.display = 'none'; // 느낌표(!) 로 if 조건문 검증 대신함
        }
        else {
            alert('Task 설명은 필수값입니다. 내용을 입력해주세요.');
        }
    };
    // 물음표(?) 로 if 조건문 대신
    addTaskButton === null || addTaskButton === void 0 ? void 0 : addTaskButton.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });
};
document.addEventListener('DOMContentLoaded', init);
