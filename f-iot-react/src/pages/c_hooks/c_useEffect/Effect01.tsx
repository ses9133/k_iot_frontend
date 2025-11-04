import React, { useEffect, useState } from 'react'

// useEffect(부수 효과)
// React 함수형 컴포넌트에서 부수 효과를 수행하기 위한 Hook
// 렌더링 이후 실행되어야하는 코드를 넣는 공간 
// - 데이터 가져오기, 컴포넌트 렌더링 시 특정 작업 수행 등 

// 부수효과란,
// : 컴포넌트의 주요 기능(UI 렌더링, 상태 관리) 외에 발생하는 작업
// ex) API 호출, 이벤트 리스너 등록, 수동 DOM 조작

/*
  리액트 컴포넌트의 생명주기(LifeCycle)
  1) 마운팅(Mounting)
    : 컴포넌트가 DOM 에 처음 삽입될 때
    - 초기 데이터 불러오기 

  2) 업데이트(Updating)
    : state 또는 props 가 변경될 때 (재렌더링시)
    - 특정값 변화 감지 및 후속 작업

  3) 언마운팅(Unmounting)
    : 컴포넌트가 DOM 에서 제거될 때
    - 리소스 해제, 타이머 정리 등 
*/

// * useEffect 기본 구조
// - 1 ~ 2개의 인자 필요
// - 1번째 인자: 콜백 함수(화살표 함수), 부수 효과를 수행하는 함수
// - 2번째 인자: 의존성 배열, 해당 배열 값의 요소가 변경될 때 마다 부수 효과가 다시 실행
//      > 의존성 배열 생략가능 - 생략시, 모든 렌더링마다 실행 (거의 사용 X)
//                       [] : 빈 배열 - 마운트시 한 번만 실행(컴포넌트 초기화용)
//        [변수1, 변수2 ...] : 해당 변수의 값이 바뀔 때 실행(특정 상태 변화 감지)

/*
  * useEffect 는 반환값 없이 사용
  useEffect(() => {
    ✅ 1. Mount 시 실행
    == 부수효과 작성 ==

    ? useEffect 의 정리 함수
    - useEffect 내부에서 함수를 return 하면 해당 함수는 컴포넌트 화면에서 사라질 때(unmount) 실행됨 => 이것을 정리 함수(clean-up) 함수라고 표현
    - 메모리 누수 방지
    ✅ 2. Clean-up 함수: Unmount 시 실행
    return () => {
    == 언마운트시 실행될 코드 ==
    ex) 타이머, 인터벌 해제(clearInterval), 이벤트 리스터 제거(removeEventListener)
    }
  }, [의존성 배열 작성...]);
*/

function Effect01() {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [time, setTime] = useState<number>(0);

  // 의존성 배열 없는 useEffect: 모든 렌더링시(마운트시 + name 변경 + count 변경)에 동작됨
  useEffect(() => {
    console.log('의존성 배열 없는 useEffect');
  });

  // count 값을 의존성 배열로 가지는 useEffect
  // : 마운트 시 실행됨 + [count] 값 상태 변경시 실행됨
  useEffect(() => {
    console.log('count 값을 의존성 배열로 가지는 useEffect');
  }, [count]);

  // name 값을 의존성 배열로 가지는 useEffect
  // : 마운트 시 실행됨 + [name] 값 상태 변경시 실행됨
  useEffect(() => {
      console.log('name 값을 의존성 배열로 가지는 useEffect');
  }, [name]);

  // 빈 배열을 의존성 배열로 가지는 useEffect
  // : 마운트 시에만 출력됨
  useEffect(() => {
    console.log('빈 배열을 의존성 배열로 가지는 useEffect');
  }, []);

  // count, name 값을 의존성 배열로 가지는 useEffect
  useEffect(() => {
    console.log('count, name 값을 의존성 배열로 가지는 useEffect');
  }, [count, name]);

  // ==== 정리 함수 ====
  // useEffect(() => {
  //   console.log('===타이머 시작 ===');

  //   // React Strict Mode 는 컴포넌트를 의도적으로 2번 실행함
  //   const timer = setInterval(() => {
  //     setTime(prev => prev + 1);
  //   }, 1000);

  //   // 정리함수 필수
  //   return () => {
  //     clearInterval(timer);
  //     console.log('타이머 정리됨 (컴포넌트 사라짐)');
  //   }
  // }, []);

  return (
    <div>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        증가
      </button>
      <span>{count}</span>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>
        감소
      </button>
      <br />
      <span>{name}</span>
      <button onClick={() => setName(name === '정은혜' ? '정세이' : '정은혜')}>이름변경</button>
      <br />
      <p>시간: {time}초</p>
    </div>
  )
}

export default Effect01