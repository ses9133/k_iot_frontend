import React, { useState } from 'react'

// useState: 컴포넌트 내에서 데이터에 대한 상태 관리

function State02() {

  // === Hooks(useState)
  const [inputValue, setInputValue] = useState<string>('');

  // const [id, setId] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // 위 두개를 합쳐서,
  interface Login {
    id: string;
    password: string;
  }

  const loginInitialValue: Login = {
    id: '',
    password: ''
  }

  const [login, setLogin] = useState<Login>(loginInitialValue);

  const { id, password } = login; // 구조 분해 할당

  // === Event Handler 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // React.ChangeEvent<HTMLInputElement>: <> 내부는 타입 단언 형태임(as 키워드가 아닌 <> 내부에서 작성) - e.target 에 접근하려면 타입 단언 필요
    // React.ChangeEvent: 는 현재 e(이벤트)의 타입 

    // input 창에 change 변화가 일어나면 처리할 로직 
    let inputValue = e.target.value; // 현재 target === 이벤트가 발생한 input 태그
    setInputValue(inputValue);
    console.log(inputValue);
  }

  const handleResetClick = () => {
    setInputValue('');
  }
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 매개변수로 전달받는 e(이벤트 객체)의 target 은 이벤트가 발생된 실질적인 요소
    // -> target 요소 내의 속성에 접근이 가능해짐

    // e.target 
    // - HTML 내의 name 과 value 속성값을 추출받음
    // - name 값: 상태 변수의 이름과 일치해야햠. 또는 상태 변수 객체 내의 속성명과 일치
    // - value 값: 사용자로부터 입력받는 값
    const {name, value} = e.target; // e.target(객체) 로부터 구조분해할당 받음
    // console.log(name);
    // console.log(value);

    setLogin({
      ...login, // id 와 password 속성을 가지는 login 객체 (이전 값가져오기)

      // 변경하고자 하는 name 키를 가진 value 값을 변경(해당 필드만 값 업데이트)
      [name]: value // name.value 아님
    });
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log('폼 데이터가 제출되었습니다.', login);

    // 데이터에 대한 활용(제출, 사용)후에는 초기화 필수
    setLogin(loginInitialValue);
  }

  const handleResetLogin = () => {
    setLogin(loginInitialValue);
  }

  return (
    <div>
      <p>useState & 이벤트 핸들러</p>
      <input 
        type="text"
        value={inputValue} 
        // onChange 이벤트
        // : 사용자가 요소에 변화를 일으킬 때 마다 발생하는 이벤트
        // - input, select, textarea 등의 요소에 적용됨
        onChange={handleInputChange}
      />
      <br />
      <select onChange={handleInputChange}>
        {/* 축구 -> 축구 선택하면 콘솔 X (즉, 상태변화가 없다는 뜻) */}
        <option value="축구">축구</option>
        <option value="야구">야구</option>
      </select>
      <br />
      <button onClick={handleResetClick}>초기화 버튼</button>

      <p>Input Value: {inputValue}</p>

      <h5>여러 개의 입력 상태 관리</h5>
      <form onSubmit={handleLoginSubmit}>
        <input 
        type="text" 
        name='id'
        value={login.id}
        placeholder='아이디'
        onChange={handleLoginChange}
      />
      <input 
        type="text" 
        name='password'
        value={login.password}
        placeholder='비밀번호'
        onChange={handleLoginChange}
      />
      <p>아이디: {id} / 비밀번호: {password}</p>
      <button type='button' onClick={handleResetLogin}>초기화</button>
      {/* - button 의 기본타입 type='submit' 임. form 태그 내부에 있을 경우 자동으로 제출 버튼으로 인식됨,
          - type='button' 으로 지정시 form 태그 안에 있어도 submit 동작을 하지 않음. 
          - 즉, 클릭시 오직 onClick 으로 연결된 handleResetLogin() 만 실행됨*/}
      <button type='submit'>전송하기</button>
      </form>
    </div>
  )
}

export default State02