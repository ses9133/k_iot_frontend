import { useCount } from '@/hooks/useCount';
import React, { useState } from 'react'

// 커스텀 훅(Custom Hook)
/*
[사용방법]
1) 반드시 use- 로 시작해야함
  ex) useInput, useSomething ...
2) 다른 Hook 을 내부에서 호출 
3) 결과와 기능을 반환

*/
function Custom01() {
  // const [count, setCount] = useState<number>(0); => hooks 파일에서 커스텀 훅으로 만듦. 
  const {count, increment, decrement, reset} = useCount<number>(0); // 커스텀 훅(useCount) 사용
  
  return (
    <div>
      <p>Count: {count}</p> 
      <button onClick={increment}>증가</button> 
      <button onClick={decrement}>감소</button> 
      <button onClick={reset}>초기화</button> 
    </div>
  )
}

export default Custom01