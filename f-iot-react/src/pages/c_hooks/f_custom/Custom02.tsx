import { useInput } from '@/hooks/useInput';
import React, { useState } from 'react'

type UserInfo = {
  name: string;
  email: string;
}

function Custom02() {
  // const [userInfo, setUserInfo] = useState<UserInfo>({
  //   name: '',
  //   email: ''
  // });

  // const handleInputChange = () => {

  // } -> 커스텀 훅 사용안한 버전

  // 커스텀 훅 사용
  const example01 = useInput('');
  const { value: name, handleReset: nameReset, bind: nameBind } = example01;
  const { value: email, handleReset: emailReset, bind: emailBind } = useInput('');
  
  const handleAllReset = () => {
    nameReset();
    emailReset();
  }

  return (
    <div>
      <p>Name: {name}</p>
      <input type="text" name='name' placeholder='사용자 이름' { ...nameBind }/>
      <button onClick={nameReset}>이름 초기화</button>
      <p>Email: {email}</p>
      <input type="text" name='email' placeholder='사용자 이메일' { ...emailBind }/>
      <button onClick={emailReset}>이메일 초기화</button>
      <button onClick={handleAllReset}>전ㅊㅔ 초기화</button>
    </div>
  )
}

export default Custom02