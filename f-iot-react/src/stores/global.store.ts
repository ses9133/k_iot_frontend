// 공용 데이터(공용 코드, 설정 등)
// - API 로 받아온 공용 데이터를 전역 캐시로 보관할 때
// Ex) 카테고리, 지역 리스트 등 여러 페이지나 컴포넌트에서 공통적으로 필요한 데이터
// > 매번 API 호출 X, 한 번 불러온 데이터를 전역에 저장하고 사용
// > 프로젝트 실행 진입점에서 호출! (= 웹사이트 실행시 호출)(App.tsx 에서 시작)

import { getCommons, type CommonResponse } from "@/apis/commonApi";
import { create } from "zustand";

/*
[전역 상태 관리하는 방법]
1. 전역 상태 구조 명시(interface 또는 type 별칭)
- 1) 카테고리, 지역 리스트 - 속성 정의 (실제 전역 관리할 데이터)
- 2) 전역 로딩 상태 관리 - 한 번 데이터가 로딩되었는지 여부를 저장(boolean)
    > 여러 컴포넌트들이 isLoaded 데이터를 보고 로딩 스피너 표시 여부나 초기 fetch 실행 여부를 판단
- 3) 실제 API 호출 함수 - fetchGlobalData() (비동기 함수)
*/
interface GlobalState {
  categories: string[];
  regions: string[];
  isLoaded: boolean;

  // axios 반환 타입은 Promise<데이터타입>
  fetchGlobalData: () => Promise<void>; 
}

/*
2. store 생성
- 해당 스토어는 외부에서 구조분해할당 또는 부분구독하여 사용
*/

export const useGlobalStore = create<GlobalState>(
  set => ({
    // 기본 상태 초기화
    categories: [],
    regions: [],
    isLoaded: false,

    // 해당 함수를 통해서 속성값 업데이트를 할 수 있는 함수
    // zustand 에서 사용되는 api 는 store 폴더가 아닌 apis 폴더에 주로 작성
    fetchGlobalData: async () => {
      try {
        // const commonDatas: CommonResponse = await getCommons();
        // set({
        //   categories: commonDatas.categories,
        //   regions: commonDatas.regions,
        //   isLoaded: true
        // })
        set({
          categories: [
            "COFFEE", "DESSERT", "DRINKS", "FOOD"
          ],
          regions: [
            "SEOUL", "BUSAN", "DAEJEON", "ULSAN"
          ],
          isLoaded: true
        })
      } catch (e) {
        set({
          categories: [],
          regions: [],
          isLoaded: false,
        })
      }
    }
  })
);