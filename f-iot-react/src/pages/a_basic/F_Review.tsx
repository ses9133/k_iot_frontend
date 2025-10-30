import React from 'react'

// tsx 파일은 반드시 컴포넌트 형식 / HTML 요소 반환

// cf) ts 파일은 일반 ts 문법 코드 형식 / 모듈(변수, 함수, 클래스 등) 반환

// * 1. Component
// : UI(사용자와 컴퓨터 시스템 사이의 의사소통 매개체, 화면)를 구축하는 기본 단위
// : 화면을 구성하는 코드 집합(재사용 가능)
// : 재사용은 export(내보내기)와 import(가져오기)를 통해 구현
// : 파일명이 반드시 대문자로 시작, cf) 일반 함수(기능적)는 소문자로 시작
// : HTML 요소를 반환
//    - 함수의 컴포넌트의 return 키워드 뒤에서 작성됨
//    - 반환되는 컴포넌트가 한개일 경우 () 소괄호 생략 가능

// * 2. JSX(TSX) 문법체계
// 1) 단일 루트 노드 반환
//    : 최상단 루트 태그 존재, 최상단에 형제 태그가 있을 수 없음
//    : 최상단 태그는 <></> 빈 Fragment 태그를 주로 사용
// 2) 태그 닫기
// 3) 대소문자 구분
//      - 소문자 태그: HTML 요소로 인식
//      - 대문자 태그: 사용자 정의 컴포넌트로 인식
//      @ <Img /> 태그가 오류나는 상황
//        이유 1) 해당 태그를 생성하지 않음
//            2) 해당 컴포넌트를 import 하지 않거나 경로가 잘못됨
// 4) JSX 내에서 HTML 코드 작성시
// - lowerCamelCase 사용 권장(css 속성, on- 이벤트 핸들러 등)
// - class 명 속성은 className 으로 대체

function F_Review() {
  return (
    <div>F_Review</div>
  )
}

export function ExampleComponent() {
  let name = '이승아';
  let fruits = ['사과', '오렌지', '망고'];

  return (
    <>
      <h1>20251030 강의</h1>
      <p>복습 중</p>
      <p>{name}강사</p>
      {/* {} 내에서 HTML 요소 작성시 () 소괄호 사용 */}
      {fruits.map((fruit, index) => (
        <p key={index}>{fruit}</p>  
      ))}
    </>
  );
}

export default F_Review