// UI/전역 인터랙션 상태
// - 컴포넌트 간에 UI 제어 상태를 공유해야 할 때 사용
// +) 브라우저 세션과 무관하게 상태값 지속할 경우 zustand + localStorage 저장 필수

import { create } from "zustand";

// 전역 상태 관리할 데이터와 함수 정의
interface UIState {
  isSideBarOpen: boolean;
  isModalOpen: boolean; // 모달 표시 여부
  darkMode: boolean; 
  toastMessage: string | null; // 토스트 메시지 없으면 null

  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  showToast: (msg: string) => void; // 매개변수값을 toastMessage에 할당
  hideToast: () => void;  // toastMessage 를 null 로 할당
}

// store 생성
export const useUIStore = create<UIState>(
  set => ({
    isSideBarOpen: false,
    isModalOpen: false,
    darkMode: false,
    toastMessage: null,

    // 함수 정의
    // > set 설정 함수의 콜백함수: 현재 최신의 state를 반환
    toggleSidebar: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    showToast: (msg) => set({ toastMessage: msg }),
    hideToast: () => set({ toastMessage: null }) 
  })
);