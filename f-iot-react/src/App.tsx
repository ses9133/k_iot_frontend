
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Basic from '@/pages/a_basic';
import RoutePages from '@/pages/b_route';
import Hooks from '@/pages/c_hooks';
import Navibar from './components/Navibar';
import PostList from './_practices/a_basic/PostList';
import PostDetail from './components/PostDetail';
import SearchApp from './_practices/c_hooks/SearchApp';
import State07_TodoApp from './pages/c_hooks/a_useState/practice/State07_TodoApp';
import Z_Products from './pages/b_route/Z_Products';
import Z_ProductDetail from './pages/b_route/Z_ProductDetail';
import Z_ProductInfo from './pages/b_route/Z_ProductInfo';
import Z_Dashboard from './pages/b_route/Z_Dashboard';
import Z_ProductReviews from './pages/b_route/Z_ProductReviews';
import HTTP from '@/pages/d_http';

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
        <Route path='/hooks' element={<Hooks />}/>
        <Route path='/http' element={<HTTP />} />

        {/* 라우터 실습코드 */}
        <Route path='/practice/post' element={<PostList />}/>
        <Route path='/practice/post/:id' element={<PostDetail />} />
        <Route path='/practice/search' element={<SearchApp />} />
        <Route path='/mypratice' element={<State07_TodoApp />} />

        {/* @pages/b_route Z_실습코드 */}
        <Route path='/' element={<Navigate to="/products"/>} />
        <Route path='/products' element={<Z_Products />} />
        <Route path='/products/:id' element={<Z_ProductDetail />}>
          {/* 중첩 라우터 (상대경로) cf) / 있는건 절대 경로*/}
          <Route path='info' element={<Z_ProductInfo />} />
          <Route path='reviews' element={<Z_ProductReviews />} />
        </Route>
        <Route path='/dashboard' element={<Z_Dashboard />}/>
      </Routes>

      {/* <ExampleComponent></ExampleComponent> */}
    </>
  )
}

export default App
