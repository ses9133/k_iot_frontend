import { useUIStore } from '@/stores/ui.store'
import React from 'react'

function Header() {
  const toggleSidebar = useUIStore(state => state.toggleSidebar);
  const toggleDarkMode = useUIStore(state => state.toggleDarkMode);
  const darkMode = useUIStore(state => state.darkMode);
  const isSidebarOpen = useUIStore(state => state.isSideBarOpen);
  const showToast = useUIStore(state => state.showToast);
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: darkMode ? '#222' : '#f2f2f2',
    borderBottom: darkMode ? '1px solid #444' : '1px solid #ccc'
  }

  const handleReserve = () => {
    // 예약 관련 코드(프론트엔드 유효성 검사 + API 호출 + 응답 성공 완료)
    showToast('예약이 완료되었습니다.');

  }

  return (
    <header style={headerStyle}>
      <h3>Korea IoT React</h3>
      <button onClick={toggleSidebar}>{isSidebarOpen ? '메뉴 닫기' : '메뉴 열기'}</button>
      <button onClick={toggleDarkMode}>{darkMode ? '밝게' : '어둡게'}</button>
      <button onClick={handleReserve}>예약 확인</button>
    </header>
  )
}

export default Header