// src/styles/theme.ts

import type { Theme } from "@emotion/react";

// 다크모드 / 라이트 테마 정의 
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#f7f7f8',
    card: '#ffffff',
    text: '#333333',
    accent: '#fda085',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  }
}

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#1e1e1e',
    card: '#2e2e2e',
    text: '#f5f5f5',
    accent: '#f6d365',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
  }
}

export type ThemeType = typeof lightTheme;