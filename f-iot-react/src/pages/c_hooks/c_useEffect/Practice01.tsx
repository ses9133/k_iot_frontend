import React, { useEffect, useState } from "react";
/*
  ! useEffect 주의사항
  1) 의존성 배열 누락 주의
    : useEffect 내부에서 사용하는 상태값이나 props 는 반드시 deps 에 포함
  2) 무한 렌더링 루프
    : useEffect 안에서 state를 잘못 업데이트하면 무한 렌더링 발생
  3) 비동기 함수 직접 전달 금지
    : useEffect(async() => {...}) 사용❌
    > 대신 내부에서 async 함수 정의후 호출

  ? deps(dependencies, 의존성 배열)
*/

// == 푸드트럭 예약 시스템 == //
// : 푸드트럭 예약 관리 화면에서, 관리자가 고객의 예약 상태를 실시간으로 모니터링하고 승인

/*
  1) 트럭 예약 데이터 불러오기 
  - 마운트시 실행
  - API 호출

  2) 일정 주기마다 자동 새로고침
  - useEffect + setInterval 로 폴링 구현

    ? 폴링(Polling): 클라이언트가 서버에게 주기적으로 요청을 보내 새로운 데이터나 상태 변화를 확인하는 방식

  3) 예약 상태 변경
  - 버튼 클릭시 수정 요청후 UI 갱신

  4) 로딩 / 에러 / 성공 상태 구분

  5) 의존성 배열 & clean-up(정리 함수)
  - 메모리 누수 방지 및 성능 최적화 
*/

// 1. 예약 데이터 타입 정의
type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

type Reservation = {
  id: number;
  customer_name: string;
  truck_name: string;
  time_slot: string; // 예약 시간대 (exL 12: 30 PM)
  status: ReservationStatus; // 사장이 관리하는 상태0
};

// 2. API 엔드포인트 (현재는 mock 데이터)
// 실제 서비스에서는 .../api/v1/reservations
const API_URL = "https://jsonplaceholder.typicode.com/users";

// 3. 메인 컴포넌트
function Practice01() {
  // == Hooks === //
  // 1) 예약 목록 상태
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // 2) 로딩 상태 - boolean
  const [loading, setLoading] = useState<boolean>(false);

  // 3) 에러 상태 - string(요청 실패시 저장)
  const [error, setError] = useState<string | null>(null);

  // == Function == //
  // 예약 데이터 가져오는 함수 정의(비동기)
  const fetchReservations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ERROR, status: ${response.status}`);
      }

      const data = await response.json();

      // 실제 예약 데이터 구조로 변환 (임시매핑)
      const mappedData: Reservation[] = data
        .slice(0, 5)
        .map((item: any, idx: number) => ({
          id: item.id,
          customer_name: item.name,
          truck_name: `Truck-${idx + 1}`,
          time_slot: `12: ${idx}0 PM`,
          status: idx % 2 === 0 ? "PENDING" : "CONFIRMED", // 홀짝에 따라 상태변경
        }));
      // ({}): () 감싸는 이유. return 시 {} 를 쓰는데 여기서 {} 는 객체를 표현하기 위한 중괄호이기때문에 return 의 {} 와 구분하기 위해서 () 로 감쌈

      setReservations(mappedData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError((e as Error).message);
    }
  };

  // == Hooks == (최상단이 아닌 여기서 작성해야하는 이유. 최상단에 쓰면 fetchReservations() 호출할 수 없음)
  // - 컴포넌트 마운트시 예약 데이터 1 회 로딩
  useEffect(() => {
    fetchReservations();
  }, []);

  // - 10 초마다 자동 새로 고침
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('예약 데이터 자동 새로 고침');
      fetchReservations();
    }, 10000);

    // return 하면, 언마운트시 타이머 정리(메모리 누수 방지)
    return () => {
      clearInterval(interval);
      console.log('폴링 중단(컴포넌트 언마운트)');
    }
  }, []);

  // ===================================

  // - 예약상태 변경 핸들러
  const updateReservationStatus = async (id: number, newStatus: ReservationStatus) => {
    try {
      // 실제 API 환경에서는 HTTP PUT 요청
      console.log(`PUT /api/v1/reservations/${id} -> ${newStatus}`);

      // UI 즉시 반영
      setReservations(prev => prev.map(reservation => reservation.id === id ?
        {...reservation, status: newStatus} : reservation
      ));
    } catch (e) {
      console.error("예약 상태 변경 실패", e);
    }
  };

  // 4. 로딩 /에러 /성공 분기 렌더링
  if (loading) return <p>🔃예약 정보를 불러오는 중입니다.</p>;
  if (error) return <p>⛔오류 발생: {error}</p>;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "f5f5f5",
        borderRadius: "12px",
      }}
    >
      <h2>🚚푸드 트럭 예약 대시보드</h2>

      {reservations.length === 0 && <p>현재 예약이 없습니다.</p>}
      <ul>
        {reservations.map((reservation) => (
          <li
            key={reservation.id}
            style={{
              backgroundColor: "white",
              margin: "10px 0",
              padding: "10px ",
              borderRadius: "8px",
            }}
          >
            <h4>
              {reservation.customer_name}({reservation.truck_name})
            </h4>
            <p>시간대: {reservation.time_slot}</p>
            <p>
              상태:{" "}
              <b
                style={{
                  color:
                    reservation.status === "CONFIRMED"
                      ? "green"
                      : reservation.status === "PENDING"
                      ? "orange"
                      : "red",
                }}
              >
                {reservation.status}
              </b>
            </p>

            <div style={{ marginTop: "8px" }}>
              {/* CONFIRMED 가 아닐 때만 승인 버튼 */}
              {reservation.status !== "CONFIRMED" && (
                <button
                  onClick={() =>
                    updateReservationStatus(reservation.id, "CONFIRMED")
                  }
                >
                  승인
                </button>
              )}
              {/* CANCELD 가 아닐 때만 취소 버튼 */}
              {reservation.status !== "CANCELLED" && (
                <button
                  onClick={() =>
                    updateReservationStatus(reservation.id, "CANCELLED")
                  }
                >
                  취소
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Practice01;
