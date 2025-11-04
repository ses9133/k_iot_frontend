import React, { useRef, useState } from 'react'

// useRef 를 사용한 DOM 요소 참조
// : 컴포넌트가 재렌더링되어도 동일한 참조값을 유지
// - 특정 DOM 요소에 접근하고 조작

// - 단순히 값 저장만이 아니라
// 1) 이전 상태 기억
// 2) DOM 요소 직접 제어

function Ref02() {
  // === Hook
  const [count, setCount] = useState<number>(0);
  const prevCountRef = useRef<number>(0);

  // ? DOM 요소 타입 - input(HTMLInputElement), div(HTMLDivElement) 등
  // > DOM 요소는 HTMLElement 타입과 null 타입을 유니온으로 가짐(기본값 - null 권장)
  const inputRef = useRef<HTMLInputElement>(null);

  // === Event Handler
  const increment = () => {
    setCount(prevCount => {
      prevCountRef.current = prevCount;
      return prevCount + 1;
    })
  }

  const handleButtonFocus = () => {
    if(inputRef.current) { // useRef 와 연결된 DOM 요소가 있따면
      inputRef.current.focus();
    }
  }

  return (
    <div>
      {/* // @ 이전 상태 기억 */}
      <p>현재 카운트: {count}</p>
      <p>이전 카운트: {prevCountRef.current}</p>
      <button onClick={increment}>증가</button>

      <br />
      <input type="text" ref={inputRef}/>
      <button onClick={handleButtonFocus}>input 에 포커스</button>
    </div>
  )
}

export default Ref02