/*
  * JS canvas 요소
  : HTML 의 <canvas> 태그를 이용하여 JavaScript 로 동적인 그래픽을 그리는 기술
  - 웹 페이지에 도화지 같은 영역을 생성
  - 2D & 3D 그래픽, 애니메이션, 데이터 시각화 등의 시각적 효과 구현에 사용
*/

const app = document.getElementById('app');

// * 1) 그림판 툴 상태를 담는 객체
type ToolStateType = {
  color: string;
  size: number;
  isEraser: boolean; // 지우개 모드 여부 (true - 지우기 모드)
}

// * 2) 기본 상태 설정
const toolState: ToolStateType = {
  color: '#000000',
  size: 5,
  isEraser: false 
}

// * 3) 상태 변경 함수
// cf) keyof 연산자
// : 객체의 키 값들을 유니언 값으로 생성
// ex) 'color' | 'size' | 'isEraser'
// * @Parma: ToolStateType 타입의 키와 해당 키의 타입을 제네릭을 통해 설정
// ex) key: 'color', value: string (ToolStateType 의 color 타입)
// ex) key: 'size', value: number
// ex) key: 'isEraser', value: boolean
function setTool<K extends keyof ToolStateType>(key: K, value: ToolStateType[K]) {
  // key: 'color' | 'size' | 'isEraser'
  // value: 각 속성값에 맞는 타입을 가진 데이터

  toolState[key] = value; // 상태 업데이트
}

// * 4) 툴바 만드는 함수
function createToolBar(): HTMLElement {
  // - 색상 선택
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = toolState.color;
  colorInput.oninput =  () => setTool('color', colorInput.value);
  // oninput: 해당 값이 바뀌는 이벤트 발생

  // - 브러쉬 크기 조절
  const sizeInput = document.createElement('input');
  sizeInput.type = 'range';
  sizeInput.min = '1';
  sizeInput.max = '10';
  // cf) input 태그의 value 값은 string
  sizeInput.value = toolState.size.toString();
  sizeInput.oninput = () => setTool('size', parseInt(sizeInput.value));

  // - 지우개 버튼
  const eraserButton = document.createElement('button');
  eraserButton.textContent = '지우개';
  eraserButton.onclick = () => {
    toolState.isEraser = !toolState.isEraser; // 상태 토글
    eraserButton.textContent = toolState.isEraser ? '펜' : '지우개';
  }

  // - 캔버스 초기화 버튼
  const clearButton = document.createElement('button');
  clearButton.textContent = '초기화';

  // 지정된 사각형 영역을 지워 투명하게 만드는 기능(x시작, y시작, x끝, y끝)
  clearButton.onclick = () => ctx?.clearRect(0, 0, canvas.width, canvas.height);

  // - 그림 저장 버튼
  const saveButton = document.createElement('button');
  saveButton.textContent = '저장';
  saveButton.onclick = () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';    // 저장 파일명
    link.href = canvas.toDataURL();  // 이미지 URL 생성
    link.click();
  }

  // 툴바 한 곳에 저장
  const toolbar = document.createElement('div');
  toolbar.className = 'toolbar';
  toolbar.append(colorInput, sizeInput, eraserButton, clearButton, saveButton);

  // 툴바 반환: HTMLElement
  return toolbar;
}

// * 5) 캔버스 생성
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 500;

app?.appendChild(createToolBar());
app?.appendChild(canvas);

/// * 6) 2D 그리기 컨텍스트 가져오기(캔버스 영역을 JS 로 가져오기)
const ctx = canvas.getContext('2d');

if(ctx) {
  ctx.lineCap = 'round'; // 선 끝 둥글게
}

// * 7) 마우스 이벤트 상태
let isDrawing = false;

// 마우스 눌렀을 때
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  ctx?.beginPath(); // 경로 시작 - 그리기 시작
  ctx?.moveTo(e.offsetX, e.offsetY);
});

// 마우스 이동시(그림을 그리고 있을 때)
canvas.addEventListener('mousemove', (e) => {
  if(!isDrawing) return;

  if(ctx) {
    ctx.strokeStyle = toolState.isEraser ? '#ffffff' : toolState.color;
    ctx.lineWidth = toolState.size;
    ctx.lineTo(e.offsetX, e.offsetY); // 선을 그릴 좌표
    ctx.stroke();
  }
});

// 마우스 땠을 때
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx?.closePath(); // 경로 종료
});

// 캔버스를 벗어난 경우 (뗀 경우와 마찬가지로 종료)
canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
  ctx?.closePath(); // 경로 종료
});