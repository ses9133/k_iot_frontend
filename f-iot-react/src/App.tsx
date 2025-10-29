
import './App.css'
import Basic from '@/pages/a_basic';
import { Img } from './pages/a_basic/C_Component';

function App() {

  return (
    <>
      안녕하세요 첫 리액트 입니다.
      <Basic />
      <div style={{ backgroundColor: 'orange'}}>
        <Img />
      </div>
    </>
  )
}

export default App
