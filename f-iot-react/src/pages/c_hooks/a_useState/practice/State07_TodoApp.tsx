import React, { useState } from 'react'

/*
[요구사항]
1. 사용자가 입력창에 할 일을 입력하고 “추가” 버튼을 누르면 목록에 추가됨
2. 각 항목에는 “완료” 체크박스가 있어서 클릭하면 완료 상태가 토글됨
3. “필터 버튼”을 통해 전체 / 완료 / 미완료 항목만 보기 가능
4. “전체 삭제” 버튼으로 모든 할 일을 지울 수 있음
5. useState로 3가지 상태 관리
  - todos : 할 일 배열
  - filter : 표시 모드 (‘all’, ‘completed’, ‘active’)
  - inputValue : 입력 필드 내용

[코드 작성순서]
1️⃣ Todo 타입 선언
2️⃣ useState 3개 생성
3️⃣ handleAddTodo – 새 할 일 추가
4️⃣ handleToggle – 완료 상태 토글
5️⃣ handleFilterChange – 표시 모드 전환
6️⃣ handleReset – 전체 삭제
7️⃣ filteredTodos – 조건부 렌더링용 배열 생성
8️⃣ JSX로 UI 구성
*/

// ✅ 1️⃣ Todo 타입 정의
// - 각 할 일의 구조를 정의 (id, text, completed)
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}


function State07_TodoApp() {
    // ✅ 2️⃣ 상태 정의
  // - todos: 할 일 목록 배열
  // - inputValue: 입력창의 현재 값
  // - filter: 필터링 상태 ('all', 'completed', 'active')
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  // ✅ 3️⃣ 입력값 변경 핸들러
  // - 사용자가 input에 입력할 때마다 inputValue 변경

  // ✅ 4️⃣ 할 일 추가 핸들러
  // - inputValue가 비어있지 않다면 새 Todo 객체 생성
  // - todos 배열에 추가하고 입력값 초기화

  // ✅ 5️⃣ 완료 상태 토글 핸들러
  // - 특정 Todo의 completed 속성을 반전(true/false) 시킴

  // ✅ 6️⃣ 필터 변경 핸들러
  // - 클릭된 버튼에 따라 filter 상태 변경 ('all' | 'completed' | 'active')

  // ✅ 7️⃣ 전체 삭제 핸들러
  // - todos 배열을 빈 배열로 초기화

  // ✅ 8️⃣ 필터링된 할 일 목록 계산
  // - filter 상태에 따라 todos 배열을 가공하여 보여줄 목록만 반환
  //   (all → 전체, completed → 완료만, active → 미완료만)

  return (
    <div>
      {/* ✅ 제목 */}
      {/* "할 일 관리" */}

      {/* ✅ 입력창 + 추가 버튼 */}
      {/* - value: inputValue
          - onChange: handleInputChange
          - onClick: handleAddTodo */}

      {/* ✅ 필터 버튼 4개 */}
      {/* - 전체, 미완료, 완료, 전체삭제 */}

      {/* ✅ 할 일 목록 렌더링 */}
      {/* - filteredTodos 배열을 map 으로 순회
          - 각 항목에 checkbox 표시
          - 완료 상태면 줄긋기(line-through)
          - 항목이 없으면 "할 일이 없습니다" 출력 */}
    </div>
  );
}

export default State07_TodoApp;