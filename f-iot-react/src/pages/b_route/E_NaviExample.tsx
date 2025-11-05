import React from 'react'
import { useNavigate } from 'react-router-dom'

function E_NaviExample() {
  
  const navigate = useNavigate();
  
  const moveToDetail = () => {
    navigate('/route/detail', { 
      state: {
        userId: 10,
        username: '정은혜',
        message: '리액트'
      }
  });
  }
  /*
    navigation 의 두번째 인자,
    - 페이지를 이동할 때 추가 데이터를 함께 전달하기 위한 옵션 객체
    - URL 에 노출되지 않고, 히스토리 객체 안에 저장된 숨은 데이터를 보내는 방식
  */
  return (
    <div>
      <h2>useNavigate 실습 페이지</h2>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <button onClick={() => navigate('/route/locate')}>Location 페이지로 이동</button>
      <button onClick={moveToDetail}>Detail 페이지로 이동 (+ state 전달)</button>
    </div>
  )
}

export default E_NaviExample