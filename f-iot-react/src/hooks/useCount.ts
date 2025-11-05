import { useState } from "react";

// 커스텀 훅
// Custom01.tsx 로 전달
export function useCount<T extends number>(initialValue: T) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => (prev + 1) as T);
  const decrement = () => setCount(prev => (prev - 1) as T);
  const reset = () => setCount(initialValue);

  return { count ,increment, decrement, reset };
}