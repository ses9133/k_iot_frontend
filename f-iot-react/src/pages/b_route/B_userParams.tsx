import React from 'react'

// * useParams
// : React Router 에서 제공하는 훅(Hook)
// - URL 주소에 적힌 변수(값)를 꺼내주는 도구

// EX) https://example.com/users/10
// : 사용자 번호(user Id: 10) - 프론트 엔드 화면을 10번 유저의 페이지로 출력해라

// cf) https://example.com/api/v1/users/10

// * useParams 이용 목적
// : 주소(URL) 마다 다른 내용을 보여주기 위함
// - 하나의 컴포넌트(UI)에 여러 화면을 보여주는 리액트의 특성을 위함

// ex) /users: 모든 사용자 목록 
//     /users/1: ID 가 1인 사용자 정보
//    >> 주소를 각각 다르게 인식하려면 useParams 로 /users/:id 중의 :id 값을 추출

// * 기본 사용법
// 1) a태그 속성을 가진 요소로 화면 전환
//    : 페이지 이동 경로는 동적 데이터(추출될 값)를 포함한 경로 그대로여야함
//    ex) '/practice/post/${post.id}'  ->  Link 태그의 to 속성에 설정
// 2) 라우트 설정
//    : 동적 데이터를 변수로 인식하기 위해 :추출할변수명 지정
//    ex) <Route path="/practice/post/:id" element={<PostDetail />} />
// 3) 동적으로 이동하는 페이지에서 변수값 추출
//    : useParams 를 호출하면 URL 에서 변수들을 객체로 반환
//    const params = useParams(); -> PostDetail 컴포넌트내에서 호출되어야함
//    params.추출할변수명; 으로 사용 (ex. params.id)

function B_userParams() {
  return (
    <div>B_userParams</div>
  )
}

export default B_userParams