import React from 'react'

// * 렌더링(Rendering)
// : 작성한 코드를 화면에 출력하는 기능
// - React가 코드를 실제 브라우저 화면(UI)로 바꾸는 과정

// cf) React 는 데이터(state, props)가 변경되면 필요한 부분만 다시 렌더링함
//  > 화면 전체가 아니라 변경된 컴포넌트만 효율적으로 갱신! (재렌더링)

// 여행 짐 싸기
// : 짐 항목의 이름, 준비 완료 여부
interface ItemType {
  name: string;
  isPacked: boolean;
}

// 자식 컴포넌트
//              props: propsType
function Item({ name, isPacked }: ItemType) {
  // 조건부 렌더링
  // : 조건에 따라 UI 를 다르게 보여주는 방법
  // - if 문(가장 명확 / JSX 안에서 사용 불가함. return 위에서 처리), 
  // - 삼항 연산자(JSX 안에서 표현 가능함, 한 줄로 간결 작성),
  // - 논리 연산자(조건이 참인 경우에만 또는 조건이 거짓인 경우에만) 사용

  // 1. if 조건문 사용한 조건부 렌더링
  // : react의 JSX 는 괄호가 문법적 요소로 사용됨 - return 문 위에서 작성
  // if(isPacked) {
  //   return (
  //     <li>{name} ✔️</li>
  //   )
  // } else {
  //   return (
  //     <li>{name}</li>
  //   )
  // }

  // 2. 삼항 연산자 사용한 조건부 렌더링
  // return (
  //   <li>{isPacked ? name + '✔️' : name}</li>
  // )

  // 3. 논리 연산자를 사용한 조건부 렌더링
  return (
    <li>
      {name} {isPacked && '✔️'}
    </li>
  )
}

function I_Rendering() {
  // * 배열 렌더링
  // : 배열 렌더링 시 map() 메서드를 사용
  // : React 는 return 문 안에서 JSX 요소들의 배열을 렌더링
  // - 순회한 후 데이터 값이 있어야 요소에 데이터 전달이 가능  
  const people = ['도훈💜', '지훈', '경민', '신유💙', '한진'];
  const peopleDescription = [
    {
      id: 0, 
      name: '도훈💜',
      job: '가수1'
    },
    {
      id: 1, 
      name: '지훈',
      job: '가수2'
    },
    {
      id: 2, 
      name: '경민',
      job: '가수3'
    },
    {
      id: 3, 
      name: '신유💙',
      job: '가수1'
    },
    {
      id: 4, 
      name: '한진',
      job: '가수5'
    }
  ];

  // - map 콜백함수를 사용한 배열 렌더링
  const listItems = people.map((person, index) => {
    return <li key={index}>{person}</li>
  });

  // - filter 콜백함수를 사용한 배열 렌더링
  const businessPeople = peopleDescription.filter((person) => person.job === '가수1');
  const businessPeopleRender = businessPeople.map(person => <li key={person.id}>{person.name}</li>);

  return (
    <div>
      <p>여행용 짐 목록</p>
      <Item name='과자' isPacked={true} />
      <Item name='음료수' isPacked={false} />
      <hr />
      <p>Map 을 사용한 전체 리스트 렌더링</p>
      <ul>{listItems}</ul>
      <hr />
      <p>Filter를 사용한 조건부 렌더링</p>
      <ul>{businessPeopleRender}</ul>
    </div>
  )
}

export default I_Rendering

// ! React 랜더링시 key 속성
// : React 에서 배열의 각 항목을 식별하고 성능을 최적화하기 위해 사용됨
// - map() 을 통해 여러 요소를 렌더링할 때, key 는 React 가 어떤 항목이 변경, 추가 또는 삭제되었는지 파악하는 용도로 사용
// - key 는 같은 배열내에서 유일해야함(주로 데이터의 PK 값 사용, index 는 가급적
//  피하기)

