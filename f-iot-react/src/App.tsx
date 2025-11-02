
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Basic from '@/pages/a_basic';
import RoutePages from '@/pages/b_route';
import Navibar from './components/Navibar';

function App() {

  return (
    <>
    {/* 경로와 상관없이 렌더링 h1~Navibar */}
      <h1>Korea IoT React</h1>
      <Navibar />

      {/* Routes 태그: Route 를 감싸는 컴포넌트 */}
      <Routes>

        {/* Route 태그: 특정 경로에 컴포넌트 지정(단일 태그 권장)*/}
        <Route path='/basic' element={<Basic />}/>

        {/* 중첩 라우팅 사용을 위해 반드시 부모 Route 의 path 끝에 /*가 필수! => 이렇게 해야 중첩된 자식 라우트 인식 */}
        <Route path='/route/*' element={<RoutePages />} />
      </Routes>

      {/* <ExampleComponent></ExampleComponent> */}
    </>
  )
}

export default App
