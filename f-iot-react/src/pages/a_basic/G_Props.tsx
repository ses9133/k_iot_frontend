import React from 'react'
import { Wrapper } from './H_Props';

/*
  * Props(Properties): 컴포넌트의 속성
  - Props 로 데이터 전달
  - 부모 컴포넌트로부터 자식 컴포넌트로 데이를 전달할 때 사용
  <ChildComponent name="정은혜"/>
  - 함수형 컴포넌트에서 데이트 받는 곳: 매개변수
      function ChildComponent({ name: string }) { .. }
      * 컴포넌트의 props 는 객체로 전달
      * 키="값" 전달은 (객체명: { 키: 데이터타입 }) 매개변수 구조로 인식
      *             >> 해당 타입 구조({ 키: 데이터타입 })는 타입 별칭으로 정의 가능
      * props 로 전달된 데이터는 자식 컴포넌트에서 readonly 처럼 사용됨

  cf) HTML 속성
    <a href="" />

*/

// * 1. 단일 props 사용
function ChildComponent(props: { name: string }) {
  // props.name 으로 접근 가능
  //  : props 는 readonly 속성이기 떄문에 값의 재할당이 불가능함
  // props.name = '정세이'; // ❌ 이렇게 하면 안 됨
  return (
    <>
      안녕하세요 {props.name} 님
    </>
  );
}

// props 라는 변수이름을 사용하지 않은 버전
// * 구조 분해 할당을 사용한 props 활용
// function ChildComponent2({ name }: {name: string}) {
//   return (
//     <>
//       안녕하세요 {name} 님
//     </>
//   );
// }

// * 위의 컴포넌트를 '타입 별칭' 으로 사용한 버전
type Child2PropsType = {
  name: string;
}

function ChildComponent2({ name }: Child2PropsType) {
  return (
    <>
      안녕하세요 {name} 님
    </>
  );
}

// * 2. 다중 Props 사용
function MultiProps(props: { name: string; colorProps: string; }) {
  // props.name, props.colorProps 로 접근 가능 (readonly 속성)
  // - 여러개의 props 가 전달되더라도 하나의 객체로 전달받음
  // - 1) 하나의 객체에 전달받거나, 
  // - 2) 한번에 각각의 요소 변수에 할당하는 구조 분해 할당도 사용 가능
  
  return (
    <div style={{ color: props.colorProps }}>반갑습니다. {props.name} 님</div>
  );  
}

// 구조분해할당과 타입 별칭 동시 사용 버전
type Multi2Type = {
    name: string; 
    colorProps: string;
}

function MultiProps2( { name, colorProps }: Multi2Type) {  
  return (
    <div style={{ color: colorProps }}>반갑습니다. {name} 님</div>
  );
}

// * 기본값 지정 (기본 매개 변수 & 기본 속성값)
type Multi3Type = {
    name?: string;  // 선택적 프로퍼티 설정
    colorProps: string;
}

function MultiProps3( { name = '개구리', colorProps }: Multi3Type) {  
  return (
    <div style={{ color: colorProps }}>반갑습니다. {name} 님</div>
  );
}

// * G_Props: 부모 컴포넌트
function G_Props() {
  const props = {
    colorProps: 'lightgray',
    name: '이지희'
  }

  return (
    <Wrapper>
      <ChildComponent name='정은혜'/> 
      {/* Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
    at ChildComponent ( */}
      <br />
      <ChildComponent2 name='정세이'/>
      <MultiProps name='홍길동' colorProps='blue' />
      <MultiProps2 name='홍길서' colorProps='red' />
      <MultiProps3 colorProps='green'/> 
      {/* name='개구리'로 기본값 지정했기 때문에 name 속성 작성안해도 됨 */}

      <MultiProps3 {...props} />
      {/* 스프레 드연산자 통해 속성을 나열해주고, props 가 구조분해할당을 사용하여 각각의 속성명을 찾아감 */}
    </Wrapper>
  );
}

// @ === Props 정리 === //
/*
  1) 부모 -> 자식으로 단방향 데이터 흐름만 가능
  2) 자식은 props 를 읽기만 가능(readonly)
  3) 상태 변경이 필요하면 부모로부터 콜백함수를 받아서 수행해야함
*/

export default G_Props