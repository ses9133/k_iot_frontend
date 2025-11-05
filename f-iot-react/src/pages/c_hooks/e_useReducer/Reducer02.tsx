import React, { useReducer } from 'react'
import { reducer } from './Reducer01';

// 리듀서 함수 재사용 + 다양한 상태 구조 관리
// const [state, dispatch] = useReducer(reducer, initialState); - 배열 반환

type CountState = {
  count: number;
  step: number;
}

type CountAction = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

const initailValue: CountState = {
  count: 0,
  step: 2
}

// 리듀서 함수
function stepReducer(state: CountState, action: CountAction): CountState {
  switch (action.type) {
    case 'increment':
      return {...state, count: state.count + state.step};
    case 'decrement':
      return {...state, count: state.count - state.step};
    case 'reset':
      return initailValue;
    default: 
      return state;
  }
}

function Reducer02() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [stepState, stepDispatch] = useReducer(stepReducer, initailValue);

  return (
    <div>
      <h5>리듀서 함수 재사용</h5>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'decrement'})}>증가</button>
      <button onClick={() => dispatch({ type: 'increment'})}>감소</button>

      <h5>카운터(2씩 증가/2씩 감소 & 초기화)</h5>
      <p>StepCount: {stepState.count}</p>
      {/* 
        dispatch 함수에 () => 작성 이유
        - 즉시 실행 방지
        - reducer 는 개발자가 직접 호출하는 것이 아니라 리액트가 내부적으로 호출 (지연실행)
      */}
      <button onClick={() => stepDispatch({ type: 'increment' })}>+2 증가</button>
      <button onClick={() => stepDispatch({ type: 'decrement' })}>-2 감소</button>
      <button onClick={() => stepDispatch({ type: 'reset' })}>초기화</button>
    </div>
  )
}

export default Reducer02