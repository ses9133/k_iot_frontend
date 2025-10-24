// 타입스크립트 환경 설정
/*
  1. Node.js 설치
  2. 프로젝트 폴더 생성
  3. TypeScript 컴파일러 설치 (typescript compiler - tsc)
  4. TypScript 설정 파일 (tsconfig.json) 생성 및 설정
  5. 기본 소스 구조 구성(src 등)
  6. 빌드 & 실행 테스트
  (선택) ESLint + Prettier 설정
  (선택) Nodemon + ts-node 로 자동 실행 환경 구성
*/

// * 1. Node.js 설치
// 설치 확인: 윈도우 + r 
// > cmd 실행: node -v, npm -v 

// * 2. npm 확인
// +) Node.js 설치 시 npm 이 자동 설치
// : npm(node package manager)은 Node.js 의 기본 패키지 관리 도구
// npm 을 사용하여 JS 의 라이브러리를 쉽게 설치하고 관리

// == npm 기본 명령어 ===
// 1) npm init
//  : 새로운 Node.js 프로젝트 시작
//  - 기본값으로 package.json 파일이 생성됨
//  - 'y' 옵션 추가(npm init -y): 질문없이 기본값으로 package.json 파일 생성

// {
//   "name": "e_typescript",  -> 프로젝트 이름 설정(기본값-현재 디렉토리 이름)
//   "version": "1.0.0", -> 프로젝트 시작 버전
//   "description": "typescript study", -> 프로젝트의 간단한 설명
//   "main": "index.js",  -> 진입점 JS 파일 (빋르 결과 기준)
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
//   }, -> npm run 명령어 정의 (npm 명령어로 프로젝트 실행, 테스트, 빌드 가능)
//   "keywords": [], -> 검색 키워드
//   "author": "jeh",  -> 작성자
//   "license": "ISC" -> 라이선스 종류
// } 


// * 3. typescript 설치
// : 타입 스크립트 설치 (npm 사용)
// > 타입스크립트 사용을 위해서는 로컬 또는 전역 환경에 TS 설치가 필수

// == 설치 방법 == 
// git bash 사용 > TS 프로젝트 최상단(e_typescript)

// * npm 을 사용하여 타입 스크립트 패키지 설치
// - 전역 설치( 'g'옵션, global)
//  : 개발자 컴퓨터 전체에 기능 추가
// > npm install -g typescript

// - 프로젝트 별 설치(개발자 의존성 설치)
// : 현재 사용하고 있는 프로젝트 내에 기능 추가
// > npm install typescript --save-dev
//   npm i typescript -D

// +) --save-dev(-D) vs -dev(-S)
// : devDependencies - 개발과정에서 필요한 패키지들의 목록
// : dependecies - 프로젝트 실행에 필요한 패키지들의 목록

// * 프로젝트 내의 타입스크립트 버전 확인(설치 확인)
// tsc -v (Version 5.9.3)

// * 4. TypeScript 설정 파일 생성
// : npx tsc --init (프로젝트 루트 경로에서 설치)
// > tsconfig.json 파일 생김

// cf) tsc 는 Typescript 의 컴파일러
//  >> npm 으로 설치시 프로젝트 로컬에만 설치
//  >> npx 는 npm 이 제공하는 실행 도우미
//    npx: 로컬의 실행파일을 찾아서 전역 설치(타입스크립트 전역 설치 완료시 tsc --init 만 입력해도 가능)

// @ tsconfig.json 내부 구조
// {
//   "compilerOptions": {
//     "target": "ES2020",                  // * 변환될 JS 버전  
//     "module": "CommonJS",                // * Node.js는 CommonJS 모듈 사용
//     "rootDir": "./src",                  // * Typescript 원본 코드 폴더
//     "outDir": "./dist",                  // * 컴파일된 JS 출력폴더
//     "strict": true,                      // * 타입 검사 강화
//     "esModuleInterop": true,             // * import express form "express" 형태 사용
//     "skipLibCheck": true,                // * 라이브러리 타입 검사 생략으로 속도 향상
//     "forceConsistentCasingInFileNames": true 
//   },
//   "include": ["src/**/*"]
// }

// * 5. 타입 스크립트 코드 컴파일 및 실행
// tsc(typescript compiler)
// : TS 파일을 JS 파일로 변환하는 도구
// - tsc 파일명.ts
//    >> 동일한 파일명의 파일명.js 생성
// - 실행방법: node 파일명.js