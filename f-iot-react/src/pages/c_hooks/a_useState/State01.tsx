import React, { use, useState } from 'react'

// * Hooks
// : 리액트 함수형 컴포넌트에서 사용할 수 있는 기능
// : use- 키워드로 시작 
//  > 여기서 해당기능을 사용한다 라는 의미
// - 함수형 컴포넌트에서 클래스형 컴포넌트처럼 상태(state) 와 라이프사이클(lifecycle) 기능을 사용할 수 있게 해주는 특별한 함수
// ex) useState: 상태 기능을 여기서 사용한다.
// ex) useEffect: 부수효과 기능을 여기서 사용한다.

// * === useState === //
// : React의 '함수형 컴포넌트 내부'에서 state(상태)를 관리할 수 있도록 제공하는 (대표적인) 기능
// - UI 에서 발생하는 이벤트에 반응하여 상태 변화
//@ - 컴포넌트 단위에서의 상태 관리를 담당
//@ - 상태값(state)과 해당 상태를 업데이트하는 함수(setState)를 한 쌍으로 반환
// >> 상태값변수명, set상태값변수명 이 한쌍 (ex: user, setUser)
// const stateArray = useState<string>('안녕하세요');
// console.log(stateArray); 
// ['안녕하세요', f]  → [현재 상태값, 상태를 변경하는 함수]

// - 상태 변경시 컴포넌트는 자동으로 재랜더링됨 (= 상태변경이 재랜더링을 유발함)
// - 상태 업데이트는 비동기적으로 처리됨
//@ - 배열 구조 분해 할당으로 사용 - [state, setState] = useState(intialValue);
// >> useState() 호출시 인자로 전달되는 값은 state에 처음 할당될 기본값
//@ - 제네릭<type>으로 타입 명시 가능
// >> useState<User>({name: '정은혜', age: 29});

// const [state, setState] = useState();
// React Hook "useState" cannot be called at the top level. React Hooks must be called in a React function component or a custom React Hook function

function State01() {
  // [기본 구조와 명명 규칙]
  // const [state, setState] = useState<type>(initialValue);

  // state: 현재 상태값 (변수)
  // setState: 상태를 업데이트하는 함수 - 명명규칙: set + 상태명(name -> setName, count -> setCount...)
  // initialValue: 초기값, 초기 상태를 설정 (생략 가능 - but, 생략하면 undefined)

  // useState 호출 규칙
  // - 1) 반드시 컴포넌트내부의 최상단에서 호출해야함
  //  : 조건문, 반복문, 내부 함수에서 호출 불가!
  // if(true) {
  //   const[state, setState] = useState();
  // } React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.
  // - 2) hooks 는 React 내부의 함수이므로 import 해서 사용
  // - 3) 여러개의 상태 사용시, 관련있는 훅끼리 묶어서 컴포넌트 상단에 배치 -> 가독성 향상


  // ! == HOOKS (useState) == //
  // useState 실습 예제 - 카운터 컴포넌트
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>('안녕하세요');

  // if(true) {
  const [msg, setMsg] = useState<string>('반갑습니다.');
  // }

  // 이벤트 핸들러 정의
  // 이벤트 핸들러 내에서 count 값 변경: 상태 설정 함수 사용
  // * 1) 상태 설정 함수를 그대로 사용 
  //    : 이전의 상태를 직접 참조
//      -> 주로 현재(이전, 최신)의 값과 관련이 없는 변화가 이루어질 경우 사용
  const handleUpClick = () => {
    setCount(count + 1); // 0 + 1 
    // setCount(count + 1); // 0 + 1 -> 함수가 두개여도 값이 똑같게 출력됨
    // setCount(5); // 상태 설정 함수의 인자값이 상태변수로 전달됨
  
   // * 2) 함수형 컴포넌트 사용
   //  : 현재(이전, 최신)의 상태값을 기반으로 상태를 업데이트 하는 경우 사용
   // * +) set- (상태 변경 함수) 함수 내에서 콜백함수를 사용
   //    setCount(() => { return ... })
   //    >> 해당 콜백함수의 인자는 상태의 최신값임
   //    >> [명명규칙] prev- 로 시작함. ex) prevName, prevCount ...
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1); // -> 상태 설정 함수 그대로 2번 사용한것과 다른 결과 출력됨
  }

  const handleDownClick = () => { 
    // 1) 상태 설정 함수를 그대로 사용
    // setCount(count - 1);

    // 2) 함수형 컴포넌트 사용
    setCount(prevCount => prevCount - 1);
    setCount(prevCount => prevCount - 1);
  }

  return (
    <div>
      <p>카운트 클릭 횟수: {count}</p>
      <button onClick={handleUpClick}>카운트 +2증가</button>
      <button onClick={handleDownClick}>카운트 -2감소</button>
      <p>{message}</p>
      <p>{msg}</p> 
      {/* msg 과 if 조건문 블록내에 있으면 여기서 msg 변수 인식못함 */}
    </div>
  )
}

export default State01