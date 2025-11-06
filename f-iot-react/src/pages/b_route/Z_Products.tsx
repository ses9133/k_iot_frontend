import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import './Z_Products.css';

// * === 상품 관련 Route 실습 예제 ===

// * 프로젝트 구조
// 1) Products: 상품 리스트 + 쿼리 필터 + state 전달
// 2) ProductDetail: useParams 로 상세 조회
// 3) ProductInfo: 중첩 라우트(상세 정보 출력)
// 4) ProductReviews: 중첩 라우트 (리뷰)
// 5) Dashboard: useNavigate, Outlet

const PRODUCTS = [
  { id: 1, name: "Laptop🖥️", category: "electronics" },
  { id: 2, name: "HeadPhones🎧", category: "electronics" },
  { id: 3, name: "Shirt👚", category: "fashion" },
  { id: 4, name: "Pants👖", category: "fashion" },
  { id: 5, name: "Shoes👠", category: "fashion" },
];

// useParams(): URL 경로에서 파라미터를 가져오는 Hook (경로 변수)
// ex) https://localhost:5173/products/1/info - 1 의 값(:(콜론) 으로 명시)

// useNavigate(): 페이지 이동을 담당하는 Hook

// useLocation(): 현재 위치 객체를 반환하는 Hook

// useSearchParams(): URL의 쿼리 스트링을 읽고 조작할 수 있는 Hook
// ex) https://localhost:5173/products?category=fashion&name=Shoes
//  - category=fashion
//  - name=shoes
//      : 위의 두 값이 SearchParams

/*
[ useSearchParams 사용방법 ]

1. [현재쿼리, 쿼리변경함수] 반환
const [searchParams, setSearchParams] = useSearchParams();

2. 쿼리 파라미터(검색 매개변수) 읽어오기
const category = searchParams.get("category");
const name = searchParams.get("name");

+) 쿼리 변경 방법
setSearchParams({ category: '', name: '' });
*/

function Z_Products() {
  const [searchParams, setSetSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const location  = useLocation();

  const filtered = category
    ? PRODUCTS.filter((product) => product.category === category)
    : PRODUCTS;

  return (
    <div style={{ padding: "20px" }} className="product-container">
      <h2>Product List</h2>
      <div className="filter-buttons">
        <button onClick={() => setSetSearchParams({ category: "electronics" })}>
          전자제품
        </button>
        <button onClick={() => setSetSearchParams({ category: "fashion" })}>
          패션
        </button>
        <button onClick={() => setSetSearchParams({})}>전체보기</button>
      </div>

      <ul className="product-list">
        {filtered.map(product => (
          <li key={product.id} style={{ listStyle: 'none'}}>
            {/* state 를 사용하여 location 상태 전달 */}
            <Link to={`/products/${product.id}`} 
            // 기본 경로뿐만 아니라 쿼리까지 포함하여 state 전달
            // : 상세피이지에서 뒤로 갈 때
            //  - /products?category=이전카테고리
            state={{ from: location.pathname + location.search }}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Z_Products;
