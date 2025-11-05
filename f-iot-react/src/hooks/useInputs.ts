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
  // values: T 타입 객체
  // ex) values.id -> string, values.password -> string 으로 타입 추론됨

  // T 객체의 key 속성들의 타입(id | password | name | ...)
  const handleChange = <K extends keyof T>(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // e.target(input 태그)에 있는 속성값들을 꺼냄. ex) name: <input name="id" /> 이런 식으로 설정된 이름
    // value: 사용자가 입력한 값

    // name 이 T 의 키 들중 하나일 때만 동작하도록 타입 제한
    /*
      예: values = { id: '', password: '' }
      → name이 "id" 또는 "password"일 때만 true
    */
    if(name in values) { // in 연산자: 객체의 key 존재 여부 확인
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