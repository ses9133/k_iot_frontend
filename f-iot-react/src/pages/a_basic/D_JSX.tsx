import React from 'react'
/*
  JSX(TSX)
  : JS(TS) 파일 내에서 HTML 과 유사한 마크업을 작성할 수 있도록 해주는 JS 구문 확장 문법

  <사용 목적>
  - 선언적 뷰 설계 가능(UI 를 직관적으로 설계)
  - 불필요한 DOM 설정 필요 X

  <특징>
  - JS + HTMl(XML) 형태로 엄격한 문법 체계
  - JSX 내에서 HTML 코드와 JS 코드를 분리 변화하려면 XML 문법을 준수해야함

  <JSX 문법 규칙>
  1) 단일 루트 노드
  - 하나의 컴포넌트는 단일 루트 노드만 반환
  - 최상단의 루트 태그가 존재해야함
  - 주로 빈 Fragment <></> 사용

  2) 태그 닫기
  - 빈 태그 사용시 닫히는 꺽쇠 괄호에 / 첨부
  - input, hr, br, img 등

  3) 대소문자 구분
  - 태그 내 이름의 대소문자를 구분
  - 소문자: HTML 요소로 인식
  - 대문자: 사용자 정의 컴포넌트로 인식

  4) HTML 코드를 JSX 로 변환시 주의점
  - 대부분 lowerCamelCase 사용
    : CSS 속성, on-메서드(이벤트 핸들러) 등
  - class 속성의 경우 className 으로 변경
    : js 의 class(객체의 템플릿)와의 이름 충돌
*/

export function Div() {
  return(
    <>
      <img src="" alt="" />
      <hr />
      <br />
      <input type="text" />

      <div className="div"></div>
    </>
  )
}

// * JSX 내에서 자바스크립트 값 사용
// : JSX 내에서 중괄호 사용 방법 2가지
// 1) JSX 태그 내에서 직접적인 데이터 사용 
// 2) '속성=' 바로 다음 사용

function D_JSX() {
  const welcomeMsg = '환영합니다.';
  const greetMsg = (name: string) => `안녕하세요 ${name} 님`;

  const userInfo = {
    name: '정은혜',
    age: 29
  }

  // 요소의 이벤트로 함수 전달
  const handleClick = (value: string) => {
    console.log(`${value}`);
  }

  // CSS 객체 (값: 문자열 지정)
  const divStyle = {
    backgroundColor: 'orange',
    color: 'white',
    padding: '10px'
  }

  // * JS 의 class 문법 - 안씀
  // class name {
  //   constructor(parameters) {
      
  //   }
  // }

  return (
    <>
      {/* HTML 요소 작성 */}
      <div>JSX 문법</div>
      <p style={{fontSize: '20px', color: 'orange'}}>안녕하세요</p>

      {/* 컴포넌트 작성*/}
      <Div />

      <hr />
      {/* 
        HTML 내에서 JS 속성 지정
        : 문자열, 숫자, 기타 JS 표현식 외의 객체도 모두 중괄호 내에서 작성
      */} 
      <div>{welcomeMsg}</div>
      <div>{greetMsg('정은혜')}</div>
      <div>이름: {userInfo.name} / 나이: {userInfo.age}</div>

      {/* 요소에 이벤트 전달시,
        : 코드를 해석하는 과정에서 실행되지 않도록 '콜백함수'의 형태로 전달
        - 익명함수의 형태
        - 해당 이벤트가 발생해야만 내부 콜백함수가 실행됨 */}
      <button onClick={() => handleClick('클릭')}>클릭해주세요</button>
      
      <div style={divStyle} id='divElement' className='divClassElement'>
        div요소 - style속성 내부에 스타일 객체를 삽입
      </div>
    </>
  )
}

export default D_JSX