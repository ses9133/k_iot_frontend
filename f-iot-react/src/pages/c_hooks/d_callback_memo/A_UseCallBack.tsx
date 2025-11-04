import React, { memo, useCallback, useState } from 'react'

// UseCallback (React 함수형 컴포넌트 Hook)
// - 특정 콜백함수가 의존성 배열에 명시된 값들이 변경되지 않는 한, 동일한 함수 인스턴스를 유지하도록 해주는 훅
// - 함수를 기억(Memoization) 해두는 Hook
// - 렌더링이 다시 일어나도 같은 함수 객체를 재사용하게 만듦
// > 주로 자식 컴포넌트에 함수 전달시 사용

// ReactComponent 리렌더링
// : 함수는 컴포넌트가 리렌더링(상태 변화 또는 props 값 변경)될 때 마다 새로운 함수 인스턴스를 생성
// +) 해당 함수가 자식 컴포넌트의 props 로 전달되는 경우, 
// 부모의 리렌더링마다 함수의 주소값이 변경되어 새로운 값으로 인식하고 자식 컴포넌트를 리렌더링시킴

// 자식 컴포넌트
//? React.memo
// : React에서 불필요한 자식 컴포넌트의 리렌더링을 방지하기 위한
//   , 성능 최적화 도구
// > 이전 렌더링 때의 props와 지금 렌더링 때의 props를 비교
//   : 동일하면 다시 렌더링하지 않음(스킵)
//   : 다르면 재렌더링 실행
const Button = memo(({handleClick}: {handleClick: () => void}) => {
  // handleClick 이라는 key 를 가지고, 그 값은 매개변수 & 반환값 없는 함수임
  console.log('버튼이 렌더링 되었습니다.');
  return <button onClick={handleClick}>자식 컴포넌트의 버튼</button>
})

// 부모컴포넌트
function A_UseCallback() {
  // === Hooks ===
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');

  // * useCallBack 사용방법
  // const 함수명 = useCallback(콜백함수 - 기존 실행함수, [deps]);
  /*
    const callbackFunc = useCallback(() => {
    }, [deps]);

    배열안의 deps 가 바뀔 때만 함수를 다시 생성
    > 그렇지 않으면 이전에 만든 함수를 재사용(메모이제이션)
  */

  // == 이벤트 핸들러
  // 부모 컴포넌트 재렌더링마다 함수의 주소값이 변경 (props 객체의 주소값이 계속 바뀜 -> UI 변경시 "버튼이 렌더링되었습니다." 가 계쏙 출력됨)
  // const handleCountClick = () => {
  //   console.log('이벤트 발생');
  //   setCount(prev => prev + 1);
  // }

  const handleCountClick = useCallback(() => {
    console.log('이벤트 발생');
    setCount(prev => prev + 1);
  }, [count]);

  console.log('부모 렌더링');

  let a = 10; // 컴포넌트 재렌더링마다 새롭게 초기화 + 할당
  
  // 컴포넌트 재렌더링마다 함수값이 새롭게 할당
  function example() {
  }

  return (
    <div>
      <h5>===useCallBack</h5>
      <p>Count: {count}</p>
      <button onClick={handleCountClick}>부모 컴포넌트의 버튼</button>
      {/* 
        1) props 값 변경으로 리렌더링되는 경우 - useCallback 으로 조절
        -> handleCountClick이 동일한 참조를 유지해서 props 변화가 없어지고, 자식 컴포넌트의 불필요한 리렌더링을 막을 수 있음
        2) 실제 부모 컴포넌트의 리렌더링되는 경우 - useCallback 으로 조절 X
        -> 예로, input 에 글자를 입력하면 setText() 가 실행됨
        -> 부모의 상태(text)가 변경됨
        -> 부모는 무조건 다시 렌더링됨(useCallback 이 부모가 리렌더링되는 걸 막을 순 없음)
        => useCallback 으로 인해 handleCountClick 함수는 새로 안만들어짐
        => 그 결과 자식에게 전달된 props 는 변하지 않음(자식 리렌더딩 X)
      */}
      <Button handleClick={handleCountClick}/>
      {/* 호출시, Button({ handleClick: handleCountClick}); 형태 */}
      {/* 자식이 받을때, props = { handleClick: handleCountClick  */}

      <input type="text" value={text} onChange={e => setText(e.target.value)} />
    </div>
  )
}

export default A_UseCallback

/*
  props 관련 개념 보충
  부모 컴포넌트
  └── <Button handleClick={handleCountClick}/>   ← 함수 전달

자식 컴포넌트
  └── props의 타입 정의 { handleClick: () => void }
      ↓
      구조분해: ({ handleClick }) → handleClick === 부모의 handleCountClick

*/