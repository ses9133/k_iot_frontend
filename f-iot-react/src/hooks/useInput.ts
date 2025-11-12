import { useState } from "react";

// Custom02.tsx 에서 쓰일 Custom Hook

type UseInputReturn = {
  value: string; // 입력필드의 현재값
  handleReset: () => void; // 초기값으로 되돌리는 이벤트 핸들러
  bind: { // bind: 묶다. - input 속성에 바로 연결가능한 객체 { value, onChange }
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
}

export function useInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(e.target.value);
  }

  const handleReset = () => {
    setValue(initialValue);
  }

  const bind = {
    value, 
    onChange: handleInputChange
  }
//   const bind = {
//   value: value,
//   onChange: handleInputChange
// } 와 동일 형태. 변수명과 프로퍼티 명이 동일할 때 생략 가능

  return { value, handleReset, bind}
}