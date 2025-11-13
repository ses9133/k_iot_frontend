import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react'

type Props = {
  toggle: () => void;
}

// 다크모드 토글 버튼 UI + 이벤트 핸들러
function ThemeToggle({ toggle }: Props) {
  // Emotion 에서 제공하는 React 의 훅
  // : ThemeProvider 로 감싼 컴포넌트 트리 안에서 현재 theme 객체를 가지고 옴
  const theme = useTheme();

  return (
    <ToggleButton onClick={toggle}>
      {theme.mode === 'light' ? 'Dark' : 'Light'}
    </ToggleButton>
  )
}

export default ThemeToggle

// 라이트/다크모드 전환 버튼 - 페이지 여러 곳에서 재사용 된다면 컴포넌트 분리
const ToggleButton = styled.button`
  background: ${({theme}) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`

/*
function ThemeToggle({ toggle }: Props) 

원형)
function ThemeToggle(props: Props) {
  const toggle = props.toggle;
}
*/