import React, { memo, useCallback, useState } from 'react'

// UseCallback (React 함수형 컴포넌트 Hook)
// 1️⃣ useCallback 이란 ?
// - 특정 콜백함수가 의존성 배열에 명시된 값들이 변경되지 않는 한, 동일한 함수 인스턴스를 유지하도록 해주는 훅
// - 함수를 기억(Memoization) 해두는 Hook
// - 렌더링이 다시 일어나도 같은 함수 객체를 재사용하게 만듦
// > 주로 자식 컴포넌트에 함수 전달시 사용

// ReactComponent 리렌더링
// : 함수는 컴포넌트가 리렌더링(상태 변화 또는 props 값 변경)될 때 마다 새로운 함수 인스턴스를 생성
// +) 해당 함수가 자식 컴포넌트의 props 로 전달되는 경우, 
// 부모의 리렌더링마다 함수의 주소값이 변경되어 새로운 값으로 인식하고 자식 컴포넌트를 리렌더링시킴

// 2️⃣ 기본 문법
/*
  const memoizedFn = useCallback(() => {
    [실행할 함수 내용]
  }, [deps]);

  1번째 인자: 기억할 함수
  2번째 인자(의존성 배열): 이 값이 바뀌면 새 함수를 다시 만들고, 안바뀌면 이전 함수를 그대로 사용
*/

/*
  3️⃣ 사용 필요성
  - 함수는 컴포넌트가 리렌더링(상태 변화 또는 props 값 변경)될 때 마다 새로운 함수 인스턴스를 생성

  - 부모가 렌더링될 때 마다, handleClick 함수가 새로운 메모리 주소로 만들어짐
  - React 는 props 가 변경된 걸로 인식해서 Child 가 불필요하게 다시 렌더링됨
  💡 즉, 함수의 내용은 같지만 참조(주소)가 달리지기 때문에 재렌더링 발생
*/
// EX)
// function Parent() {
//     const handleClick = () => console.log('clicked!');
//     return <Child onClick={handleClick} />;
//   }

// 4️⃣ useCallback 사용하여 해결
// function Parent() {
//   const handleClick = useCallback(() => {
//     console.log('clicked!');
//   }, []); // 의존성이 없으니 한 번만 생성됨

//   return <Child onClick={handleClick} />;
// }
// - 리렌더링되어도 handleClick 함수는 같은 참조(주소)를 유지하므로 자식 컴포넌트가 불필요하게 렌더링되지 않음

// 5️⃣ useCallback + React.memo 같이 쓰기
const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log('자식 컴포넌트 렌더링');
  return <button onClick={onClick}>자식 버튼</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // handleClick 함수는 렌더링이 여러 번 일어나도 “같은 참조(주소)”를 유지
  const handleClick = useCallback(() => {
    console.log('clicked!');
  }, []);

  console.log('부모 렌더링');

  return (
    <div style={{ margin: '15px', padding: '1px', background: '#eee', borderRadius: '15px'}}>
      <h4>My</h4>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Count 증가</button>
      <Child onClick={handleClick} />
    </div>
  );
}
// 자식 컴포넌트가 React.memo 로 감싸져있을 때, props 가 같다면(이전 렌더링때의 props 와 지금 렌더링때의 props 비교) 리렌더링 막을 수 있음

// 6️⃣ 의존성 배열이 있는 경우
// const handleClick = useCallback(() => {
//   console.log(count);
// }, [count]);
// count 가 변할 때 마다 새로운 함수가 만들어짐. 내부엥서 count 를 참조하므로, React 가 새로운 값 기준으로 다시 기억함

/*
| Hook            | 기억하는 대상    | 주 목적      |
| --------------- | ---------- | --------- |
| **useCallback** | 함수         | 함수 참조 안정화 |
| **useMemo**     | 함수의 “결과 값” | 계산 비용 절약  |

*/

/*
📍런타임과 컴파일 시점에서의 props
1️⃣ 부모는 props데이터를 만든다(객체 생성)

2️⃣ 자식은 props 타입을 정의한다
React.memo(({ onClick }: { onClick: () => void }
- 여기서 { onClick: {onClick: () => void }} 는 자식이 기대하는 props 의 구조를 TS 에게 알려주는 약속
=> onClick 이라는 props 를 받을 거고, 그 함수는 매개변수 없이 void 를 반환하는 함수라는 것을 정의
-> 실행 시점에는 영향주지 않음. 즉 JS 로 컴파일되면 이 타입정보는 완전히 사라짐

3️⃣ TSX 변환 과정
<Child onClick={handleClick} />
            👇
Child({ onClick: handleClick }); -> React 내부에서 실제로 이렇게 변환됨
- React 는 부모의 실제 함수(handleClick)를 자식 컴포넌트의 매개변수(props)로 전달
- TS 는 이 전달이 타입 규칙에 맞는지 검사

4️⃣ 타입 검사는 컴파일 단계에서만 !
- TS 는 오직 정적(compile-time)으로 이 코드가 타입 규칙에 맞는지 확인
  ✅ 부모 함수 타입: 매개변수 X, 반환값X
  const handleClick = () => {
    console.log('clicked!');
  };

이고, 자식은
  ✅ onClick 이라는 속성이 있고, 그 속성은 매개변수 없고 반환값없는 함수 
({ onClick }: { onClick: () => void })

  ➡️ 즉 두 타입 모두 
  " () => void " 이런 구조!!! 타입 일치함
  
*/

/*
  ! useCallback 사용한 경우

* 부모의 “Count 증가” 버튼 클릭 시,
- setCount(count + 1) → 부모가 리렌더링됨
- 하지만 handleClick의 주소(참조)가 동일하기 때문에
→ 자식이 받은 props 내용이 변하지 않음
→ React.memo가 “props 동일”이라고 판단
→ 자식은 리렌더링되지 않음!

* 자식의 “자식 버튼” 클릭 시,
- 이건 렌더링이 아니라 이벤트 실행
- React는 버튼 클릭 시 단순히 이벤트 핸들러(= handleClick)을 실행
*/

export default Parent
