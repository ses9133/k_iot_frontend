// 인증 객체 처리

import { signIn } from "@/apis/authApi";
import { create, type StateCreator } from "zustand";
import type { PersistOptions } from "zustand/middleware";
import { devtools, persist } from "zustand/middleware";

// 전역 상태 관리될 사용자 데이터
interface User {
  id: number;
  loginId: string;
  // nickname: string;
}

export interface AuthState {
  // 현재 로그인한 사용자 정보 (로그인 안했을경우: null)
  user: User | null;

  // 로딩 상태(로그인/로그아웃 요청 중 true)
  isLoading: boolean;

  // 토큰 상태
  accessToken: string | null;

  // 예외 상태
  error: string | null;

  // @ 액션 처리
  // 로그인 함수(비동기)
  login: (loginId: string, password: string) => Promise<void>;

  // 로그아웃 함수
  logout: () => void;

  // 사용자 설정 함수
  setUser: (u: User | null) => void;

  // 토큰 설정 함수
  setAccessToken: (token: string | null) => void;

  // 리프레시 토큰 설정 함수
  refreshToken: () => Promise<void>;
}

// set 설정 함수
// get 함수

// ? 미들웨어 
// 1) devtools
// : 리액트 상태관리 라이브러리에서 브라우저 개발자 도구와 연결해주는 역할
// - dispatch 되는 액션을 가로채서 개발자 도구에 상태 변화를 기록 + 상태 추적
// >> 디버깅 용이

// 2) persist
// : 상태를 지정된 스토리지에 지정하고, 앱이 다시 로드될 때 이 저장소에서 상태 복원

// withEnhancers 함수: Zustand 스토어를 만들 때, 환경에 따라 persist(데이터 저장)과 devtools(개발자 도구 추적)을 자동으로 붙여주는 확장 래퍼 함수
// <T>: 제네릭 타입 매개변수(어떤 형태의 스토어를 만들어도 사용할 수 있게 만들어놓은 것)
// ex) AuthStore 면 T = Authstore, TodoStore 면 T = TodoStore
const withEnhancers = <T>(
  // set) 상태를 업데이트하는 함수
  // get) 현재 상태를 읽는 함수
  storeCreator: StateCreator<T>, // set, get 가져와서 객체 반환
  options?: PersistOptions<T> // options: persist 에서 데이터를 복원할 장소 명시
  // PersistOptions 타입은 그 설정 정보 (저장소 이름, 직렬화 방식 등)를 담고 있음
) => {
  const persistoptions = options ?? {name: 'app-store'};
  return import.meta.env.MODE === 'production' 
  // persist(): 상태를 저장소에서 자동 저장/복원하는 미들웨어.  
  ? persist(storeCreator, persistoptions)
  // devtools: 상태 변화를 개발자 도구에서 추적하도록 도와주는 미들웨어
  : devtools(persist(storeCreator, persistoptions));
}
// 오류 이유(-)

// export const useAuthStore = create<AuthState>()(
//   withEnhancers((set, get) => ({ 
//     // 초기 상태 명시
//     user: null,
//     accessToken: null,
//     isLoading: false,
//     error: null,

//     // 액션 정의
//     setUser: (u) => set({ user: u}),
//     setAccessToken: (token) => set({ accesssToken: token }),
//     login: async (loginId, password) => {
//       set({ isLoading: true, error: null });
//       try {
//         const data = await signIn({ loginId, password });
//         set({
//           user: { id: 1, loginId: data.username },
//           accessToken: data.accesssToken,
//           isLoading: false
//         });
//       } catch (e) {
//         set({
//           isLoading: false,
//           error: (e as Error).message ?? '로그인 실패',
//         })
//       }
//     },
//     logout: () => {
//       set({
//         user: null,
//         accessToken: null
//       });
//     },
//     refreshToken: async () => {
//       try {
//         const newToken = 'refreshed-token';
//         set({ accessToken: newToken });
//       } catch (e) {
//         set({
//           error: (e as Error).message
//         })
//     },
//     }))
// );


export const useAuthStore = create<AuthState>(
  set => ({
    // 초기 상태 명시
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,

    // 액션 정의
    setUser: (u) => set({ user: u}),
    setAccessToken: (token) => set({ accessToken: token }),
    login: async (loginId, password) => {
      set({ isLoading: true, error: null });
      try {
        const data = await signIn({ loginId, password });
        set({
          user: { id: 1, loginId: data.username },
          accessToken: data.accessToken,
          isLoading: false
        });
      } catch (e) {
        set({
          isLoading: false,
          error: (e as Error).message ?? '로그인 실패',
        })
      }
    },
    logout: () => {
      set({
        user: null,
        accessToken: null
      });
    },
    refreshToken: async () => {
      try {
        const newToken = 'refreshed-token';
        set({ accessToken: newToken });
      } catch (e) {
        set({error: (e as Error).message})
      }
    },
  })
);




