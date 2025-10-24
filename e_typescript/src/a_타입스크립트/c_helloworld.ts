console.log('Hello TypeScript!');

let num: number = 3;
// num = '안녕하세요'; // Type 'string' is not assignable to type 'number'
console.log(num);

// * ts 코드는 실시간으로 js 컴파일 반영 X, +) TS 파일은 node 파일명.ts 로 실행되지 않음
// * tsc c_helloworld.ts -> .js 파일(컴파일된) 생성됨

// ts-node 를 사용한 실시간 번역 및 실행
// : js 파일 생성 X
// : npm install ts-node --save-dev (프로젝트 최상단에서)
// : npm install -g ts-node(경로 상관없음)
// * 설치후 반드시 package.json 파일 확인

// 버전확인 npx ts-node -v