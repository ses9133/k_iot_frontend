import React, { Children } from 'react'

// * 이벤트 핸들러
//  : 사용자와 상호작용(클릭, 입력, 제출 등)에 반응하여 실행되는 함수

// * 이벤트 등록 방법
// 1) 함수 이름 전달
// : <button onClick={handleButtonClick}></button>
// 2) 익명 함수
// : <button onClick={() => console.log('클릭')}</button>

// 함수 호출하면 안됨 - 호출시 즉시 실행됨(이벤트가 일어났을 때가 아니라)

// * 이벤트 핸들러 전달
interface ButtonProps {
  children: React.ReactNode;
  onButtonClick: () => void; 
  // onButtonClick 이라는 속성 이름을 가진 함수 타입의 값이 props 로 전달되어야함
}
// 자식 버튼이 실행시킬 이벤트 핸들러 함수를 부모로부터 받을 준비를 함

// ==  이벤트 핸들러를 자식 컴포넌트에 전달 ==
// 부모 컴포넌트) 이벤트 핸들러를 정의하는 역할
// 자식 컴포넌트) 해당 핸들러를 props 로 받아 실행하는 역할
// ! 이벤트 로직은 부모가 담당, UI 는 자식이 담당하는 역할 분리

// @ 자식 컴포넌트: 이벤트 핸들러를 props 로 받음
function ButtonComponent({ children, onButtonClick }: ButtonProps) { // ButtonProps 객체에서 두 속성만 뽑음: 구조분해 
  return (
    <button onClick={onButtonClick}> 
      {children}
    </button>
  )
  // onClick 속성에는 콜백함수를 전달해야함
}

// * props.children을 사용하여 이벤트 재사용
// : 부모 컴포넌트에서 속성(props)으로 message 값과 해당 컴포넌트 태그들 사이의 내용을 전달받음
interface ConsoleProps {
  message: string;
  children: React.ReactNode;
}

// @ 자식 컴포넌트: message props 와 children 사용
// 부모로부터 이벤트 함수 대신 출력 메시지 데이터만 전달받음. 이벤트는 onClick={() => console.log(message)}처럼 자식 내부에서 직접 작성.
function ConsoleButton({message, children}: ConsoleProps) {
  return (
    <button onClick={() => console.log(`${message}`)}>
      {children}
    </button>
  )
  // {children} -> 버튼 내부에 표시할 내용
}
// ButtonComponent: 부모의 이벤트 로직을 받아 실행
// ConsoleButton: 자식이 자체적으로 이벤트 로직을 가짐

// @ 부모 컴포넌트
function J_Handler() {

  // 이벤트 핸들러 함수 명명 권장법: handle + 요소 + 행위 || 요소 + 행위 + handler
  function handleButtonClick() {
    console.log('버튼을 클릭하였습니다.');
  }

  // 자식 컴포넌트에 전달할 이벤트 함수 (화살표 함수 사용 권장)
  const buttonHandler = () => {
    console.log('부모로 부터 전달하는 이벤트 핸들러 함수');
  }

  return (
    <div>
      <button onClick={handleButtonClick}>클릭해주세요</button>
      {/* 버튼을 누르면 handleButtonClick 실행되어 '버튼을 클릭하였습니다.' 출력됨 */}
      <hr />
      <ButtonComponent onButtonClick={buttonHandler}>클릭이벤트 전달</ButtonComponent>
      {/* 부모의  buttonHandler 함수가 props 를 통해 자식에게 전달*/}
      <hr />
      <ConsoleButton message='A버튼 클릭'>A버튼</ConsoleButton>
      <ConsoleButton message='B버튼 클릭'>B버튼</ConsoleButton>
      {/* 각각의 자식은 message props 를 받아서 클릭시 console.log(A버튼 클릭) 또는 (B버튼 클릭이 출력됨)*/}

      <hr />
      <form onSubmit={(e) => {
        e.preventDefault(); // 새로고침 방지
        console.log('전송완료');
      }}>

        <button type='submit'>제출버튼</button>
        <input type="submit" />
      </form>
    </div>
  )
}

export default J_Handler

/*
  * 이벤트 핸들러 명명 규칙(권장 사항)
  1) on- 시작
    : props 로 전달받는 이벤트 핸들러(이벤트 바인딩 용)
    - 컴포넌트 외부에서 전달받는 이벤트 핸들러
    ex) onButtonClick, onFormSubmit
  2) -Handler 또는 handler-
    : 내부 함수(실제 처리 함수)
    - 내부에서 정의된 로직 함수
    ex) buttonClickHandler, formSubmitHandler
    : 내부함수(단일 컴포넌트 내부에서만 쓰이는 함수)
*/