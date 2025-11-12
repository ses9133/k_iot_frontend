import TruckReservationDetail from '@/components/TruckReservationDetail';
import TruckReservationList from '@/components/TruckReservationList';
import { useReservationStore } from '@/stores/reservation.store';
import React, { useEffect } from 'react'
import '@/pages/e_global_state/truck-pages.css'

// 가게(트럭)에 대한 상세 페이지
// : 가게 상세 정보 페이지 
// - store 를 통해 트럭 선택 / 예약 목록 호출을 제어
//  > 좌측 사이드바에서 트럭 선택 (store.setSelectedTruckId + fetchReservations 호출)
//  > 중앙에서 예약 목록, 우측에 상세 컴포넌트 렌더링 
function TruckDetailPage() {
  const {
    selectedTruckId, 
    setSelectedTruckId, 
    fetchReservations, 
    clearSelection
  } = useReservationStore();

  // 예시 트럭 목록 - 실제 앱에선 API로 받아와야함
  const exampleTrucks = [
    {id: 1, name: "한강 푸드트럭", category: "DESSERT", region: 'SEOUL', description: '디저트를 파는 한강의 푸드트럭입니다.'},
    {id: 2, name: "부산 광안리 푸드트럭", category: "FOODS", region: 'BUSAN', description: '음식을 파는 광안리의 푸드트럭입니다.'},
    {id: 3, name: "대전 푸드트럭", category: "DRINKS", region: 'DAEJEON', description: '음료를 파는 유성의 푸드트럭'}
  ];

  // 최초 로딩시 트럭 목록 가져오기
  // useEffect(() => {
  //   fetchTrucks();

    // +) 초기 트럭 자동 선택 로직 추가 
    // > (owner 입장: 제일 최근의 가게 / consumer 입장: 제일 인기 많은 가게)
  // }, [fetchTrucks]);

  // 트럭 선택 핸들러
  const handleSelectTruck = async (truckId: number) => {
    if(selectedTruckId === truckId) {
      setSelectedTruckId(null);
      clearSelection();
      return; 
    }
    setSelectedTruckId(truckId);
    await fetchReservations(truckId);
  }

  return (
    <div className='truck-page-container'>
      <aside className="truck-sidebar">
        <h3 className="truck-sidebar-title">트럭 선택</h3>
        <ul className="truck-list" role='list'>
          {exampleTrucks.map(truck => (
            <li key={truck.id}>
              <button type='button' className={`truck-list-btn $ {selectedTruckId === truck.id ? "active" : "}`} onClick={() => handleSelectTruck(truck.id)}>
                {truck.name} 
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className='truck-main'>
        <div className="truck-main-header">
          <h1>푸드트럭 상세</h1>
          <div className="truck-current">
            현재 선택된 트럭: {selectedTruckId ? `${selectedTruckId}` : '없음'}
          </div>
        </div>
        <div className="truck-container-grid">
          <section className='left-panel' aria-label='예약 목록'>
            <TruckReservationList />
          </section>
          <section className="right-panel" aria-label='예약 상세'>
            <TruckReservationDetail />
          </section>
      </div>
      </main>
      
    </div>
  )
}

export default TruckDetailPage