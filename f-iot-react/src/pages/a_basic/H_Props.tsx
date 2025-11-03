import React, { Children } from 'react'

// * 자식 컴포넌트
//  : 

type User = {
  name: string;
  age: number;
  email: string;
}

type UserCardProps = { user: User };

                  // 구조 분해 할당 형식
const UserCard = ({ user }: UserCardProps) => {
  console.log(user.name);
  console.log(user.age);
  console.log(user.email);

  // 구조분해할당 사용시 'user.속성명' 이 아닌 속성명으로 바로 접근 가능 
  const { name, age, email } = user;
  console.log(name);
  console.log(age);
  console.log(email);

  return (
    <>
      <p>{user.name} </p>
      <p>{name} </p>
    </>
  )
}

// * Wrapper 컴포넌트
// : 다른 컴포넌트를 감싸는 컴포넌트
// - props 데이터로 다른 컴포넌트(ReactNode)를 전달받음
// - 자식컴포넌트를 안전하게 받기 위한 타입

// 1. 타입 정의 먼저
type ChildrenType = {
  // ReactNode
  // : JSX 요소, 문자열, 숫자, 컴포넌트 등 모든 React 렌더링 가능한 타입
  // : JSX 가 자동으로 처리해주기 때문에 props 로 전달할 때는 직접 명시할 필요 없음
  children: React.ReactNode;
};

// 2. props 타입을 지정한 컴포넌트
export const Wrapper = ({ children }: ChildrenType) => {
  return (
    <div style={{ border: '2px solid black', padding: '16px' }}>
      {children}
    </div>
  );
};


function H_Props() {
  const userData = {
    name: '이민경',
    age: 20,
    email: 'asdfdf'
  }

  return (
    <div>
      {/* 
        == 콘솔창 / 컴포넌트 모두 두 번 실행 ==
        : React18 이후의 StrictMode가 개발 모드에 서 부작용 탐지 위해 두 번 렌더링
        : 실제 배포 환경에
        서는 한 번만 렌더링
      */}
      <UserCard user={{ name: '이지훈', age: 20, email: 'asdf' }}/>
      <UserCard user={userData}/>

      {/* <Wrapper /> */}
      {/* 컴포넌트 Wrapper 는 React.ReactNode 타입을 가지는 속성이 있기때문에 props 로 전달할 때 children=".." 작성할 필요 없음 */}
      <Wrapper>
        <div>안녕하세요 Wrapper임</div>
      </Wrapper>
    </div>
  )
}

export default H_Props