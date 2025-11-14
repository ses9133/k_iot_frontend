// emotion theme 값 타입 정의
// - 반드시 types 폴더 내에 작성 >> ts.config.app.json 의 incluees 배열값과 일치

import "@emotion/react";

declare module '@emotion/react' {
  export interface Theme {
    mode: 'light' | 'dark'
    colors: {
      background: string
      card: string
      text: string
      accent: string
      shadow: string
    }
  }
}