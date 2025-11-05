import React from 'react'

interface SearchResultsProps {
  results: string[],
  loading: boolean
}

// 검색 결과 UI
function SearchResults({ results, loading }: SearchResultsProps) {
  if(loading) {
    return <p className='message'>검색중입니다...</p>
  }
  
  if(results.length === 0) {
    return <p className='message'>검색 결과가 없습니다.</p>
  }
  return (
    <div>
      <ul className="results">
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults