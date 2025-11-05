// 관리할 input 이 여러개인 경우
// - 각각의 useInput 을 호출하는 대신 객체 단위로 관리 가능

import { useState } from "react";

/*
  T 객체 내부 *
  id: string;
  password: string;
  name: string;
  age: number;
*/
export function useInputs<T extends object>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  // T 객체의 key 속성들의 타입(id | password | name | ...)
  const handleChange = <K extends keyof T>(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // name 이 T 의 키 들중 하나일 때만 동작하도록 타입 제한
    if(name in values) {
      setValues(prev => ({
      ...prev, [name]: value as T[K]
      }));
    }
    
  }

  const handleReset = () => setValues(initialValues);

  return {
    values,
    handleReset,
    bind: {
      onChange: handleChange
    }
  }
}