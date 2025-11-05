import React, { useReducer, useState } from 'react'

// === React 컴포넌트의 상태 관리 (useState vs useReducer)===

/*
  1) useState
  - 리액트에서 가장 기본적인 상태 관리 Hook
  - 간단한 상태값 변경시 사용
  - 컴포넌트 내부에서 직접 상태 처리 가능
  >> 단순한 값(숫자, 문자열, boolean 등)을 관리할때 적합
  >> 컴포넌트 내부에서 바로 상태를 변경하는 상태 변경 함수(set-)를 호출
  [형식] const [state, setState] = useState<stateType>(initialValue);

  2) useReducer
  - 리액트에서 복잡한 상태 로직을 관리하는 Hooks
  - 상태 업데이트 로직을 외부에서 선언가능 (재사용 가능)
  > 상태 업데이트 로직을 reducer 함수로 분리하여 관리 가능
  [형식] const [state, dispatch] = useReducer(reducer함수, 초기상태);
  [구성요소]
  ⚪ state: 현재 상태 값(관리되는 데이터)
  ⚪ dispatch: 액션(Action)을 전달하여 상태를 변경하는 함수(상태 변경을 요청하는 함수)
    >> 해당 함수에 액션을 전달할 경우, reducer 함수가 호출되어 새로운 상태 계산
  ⚪ reducer: 리듀서 함수(상태를 어떻게 바꿀지를 정의하는 함수 , useReducer 의 인자로 전달되는 함수)
    >> 상태 변경 로직을 포함(switch, case)하고, 이전 상태와 액션 객체를 인자로 받아 새로운 상태를 반환
  ⚪ 초기상태: 숫자, 문자열, 배열, 객체 등 어떤 값도 가능하나 확장성을 고려하여 객체타입으로 주로 많이 씀

  @  useState vs useReducer 사용 상황 정리
  - 단순한 값(토글, 입력값 등) : useState
  - 복잡한 상태 로직(여러조건, 단계적 변경): useReducer
  - 여러 상태가 하나의 이벤트로 함께 변경할 경우: useReducer
*/ 

/*
  <reducer 함수 형태>
  function reducer(state, action) {
    switch(action.type) {
      case '동작A':
        return 새로운 상태;
      case '동작B':
        return 새로운 상태;
      default:
        return state;
    }
  }
*/

/*
  @ useReducer 장점
  1) 복잡한 로직 분리 - 상태 변경 로직을 컴포넌트 외부로 분리 가능
  2) 여러 컴포넌트에서 같은 reducer 를 공유 가능
  3) 상태 변경 흐름이 명확 - dispatch 가 action 을 받아 -> reducer 에 전달 -> 상태가 state 에 전달
*/

export type CountState = {
  count: number;
}

export type CountAction = { type: 'increment' } | {type: 'decrement'};

// 리듀서 함수
export function reducer(state: CountState, action: CountAction): CountState { // state 타입(CountState)은 useReducer 인자의 초기상태 타입과 동일해야함
  switch(action.type) {
    case 'increment':
      // 리듀서함수에는 콜백 형태 함수 필요없음
      // - 현재 상태(state)값을 인자로 직접 전달받기때문
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
  }
}

function Reducer01() {
  const [count, setCount] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  // state 타입: 객체 타입 {count: 0}

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  }

  const handleDecrement = () => {
    setCount(prev => prev - 1);
  }

  return (
    <div>
      <h5>useState 를 사용한 상태관리</h5>
      <p>{count}</p>
      <button onClick={handleIncrement}>증가</button>
      <button onClick={handleDecrement}>감소</button>

      <h5>useReducer 를 사용한 상태관리</h5>
      <p>{state.count}</p>
      {/* dispatch 는 액션을 reducer 에게 전달 */}
      <button onClick={() => dispatch({ type: 'increment' })}>증가</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>감소</button>
    </div>
  )
}

export default Reducer01