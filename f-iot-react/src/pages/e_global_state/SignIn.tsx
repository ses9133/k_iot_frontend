import { useAuthStore } from '@/stores/auth.store';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await login(loginId, password);

    if(useAuthStore.getState().user) {
      navigate('/');
    }
    /*
      useAuthStore.user 를 못하는 이유
      - zustand 의 create() 함수 반환값은 Hook 임. 즉, 컴포넌트 내부에서만 호출가능한 함수임 -> 해당 컴포넌트 내에서는 바로 user 로 접근할 수 있지만,
      - useAuthStore 자체는 훅 함수이기때문에(객체가 아니라 함수) useAuthStore.user 는 함수에서 바로 속성을 찾으려고 하는 것이기 때문에 이렇게 호출 불가능함
      ❓그런데 useAuthStore.getState() 는 왜 되느냐?❓
      - zustand 에서 React 훅을 반환할 때, 특별한 유틸리티 메서드를 붙여줌
      -ex) .getState(): 현재 전역 상태를 React 밖에서도 읽을 수 있음.
            .setState(): 전역 상태를 강제로 업데이트 가능
            .subscribe(): 상태 변경을 구독할 수 있음

    */
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <input type="text" placeholder='아이디' value={loginId} onChange={e => setLoginId(e.target.value)}/>
        <input type="text" placeholder='비밀번호' value={password} onChange={e => setPassword(e.target.value)}/>

        {error && <p>{error}</p>}

        <button type='submit' disabled={isLoading}>
          {isLoading ? '로그인 중' : '로그인'}
        </button>
      </form>
    </div>
  )
}

export default SignIn