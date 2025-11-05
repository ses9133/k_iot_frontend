import SearchBox from '@/components/SearchBox';
import SearchResults from '@/components/SearchResults';
import { useSearch } from '@/hooks/useSearch'
import React from 'react'

//? 요구 사항 (시나리오)
// 웹 사이트 "검색 기능"을 만들 때
// 1) 페이지 진입 시 자동으로 input에 포커스: useRef
// 2) 입력한 검색어를 상태로 관리: useState
// 3) 검색 시 로딩 중 메시지 표시: 조건부 렌더링
// 4) 검색 완료 후 결과 표시: component + props 

// 폴더 구조
//@ _practices/
//   - SearchApp.tsx
//@ hooks/ 
//   - useSearch.ts
//@ components / 
//   - SearchBox.tsx
//   - SearchResults.tsx

// 전체 페이지 구성
// - useSearch 커스텀 훅을 사용하여 검색 기능 통합 관리
// - SearchBox, SearchResults 를 UI 로 분리
function SearchApp() {
  const {
    query,
    setQuery,
    results,
    loading,
    inputRef,
    handleSearch,
    reset
  } = useSearch('');
  return (
    <div>
      <SearchBox 
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        reset={reset}
        inputRef={inputRef}
        loading={loading}
        />

      <SearchResults results={results} loading={loading}/>
    </div>
  )
}

export default SearchApp