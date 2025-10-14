// === 자바스크립트의 this 키워드 === //
console.log('==== this ====');

/*
  객체(속성, 기능)

  변수종류 객체명 = {
    (속성)
    키1: 값1,
    키2: 값2,
    ..., 

    (기능)
    키4: 함수선언(함수 선언식, 함수 표현식, 화살표 함수 모두 사용 가능)
  }
 */

let shinRamyeon = {
  name: '신라면',
  company: '농심',
  taste: '아주 매움',

  boil: function() {
    console.log('라면을 끓입니다.');
    console.log(`${this.name} 을 끓입니다`); // 여기서의 this 는 shinRamyeon, this.name 은 신라면
  }, 
  eat: () => {
    console.log('라면을 먹습습니다.');
  }
  // 속성과 기능 사이에는 반드시 ,(콤마)로 구분!!
}

// ! this 
// : 지금 동작(호출)하고 있는 코드를 포함한 객체를 가리킴

// ! 컨텍스트(context)
// cf) 전역 컨텍스트(global context)
//  : 파일 전체에서 가장 바깥쪽에 있는 상태
//  - 전역 실행 상태
console.log(this); // {} - 해당 파일의 전역 스코프(전역 상태) (.js 파일내에 보이지 않는 중괄호가 있다고 생각)

// - Node.js 환경에서는 global(전역) 객체
// - 브라우저 환경에서는 window 객체

let num1 = 1;
const PI = 3.14;
function add(a, b) {
  return a + b;
}

// cf) 함수 컨텍스트: 함수 내부의 this
// ? 1. 일반 함수의 this
//  : 전역 객체를 의미 (전역 컨텍스트와 동일)
function showThis() {
  console.log(this);
  console.log(this.PI);
  console.log(this.num);
}

showThis(); 
// <ref *1> Object [global] (전역을 참조한다)
// undefined
// undefined -> 이유: 함수가 변수보다 더 위에 호이스팅 되기 때문

// ? 2. 객체 메서드 안의 this
// : 객체의 변수에 할당되는 함수
// - 메서드 호출시 this 는 해당 메서드를 호출한 객체에 바인딩됨(bind: 묶다, 고정하다)
const myObject = {
  name: 'object',
  showThis: function() {
    console.log(this);
  }
}

myObject.showThis(); // { name: 'object', showThis: [Function: showThis] } -> 객체 그 자체

// cf) 객체 리터럴 정의시: this 값이 정의한 해당 객체에 고정됨 (myObject로)
//     생성자 함수 사용시: this 값은 현재의 객체에 바인딩됨 (어떤 객체를 호출하느냐에 따라 달라짐)

// ? 3. 생성자 함수와 this
function Person(name) {
  this.name = name;
  // this.name: 객체의 변수
  // name: 매개변수로 전달받은 실제 데이터값
}

const person1 = new Person('정은혜'); // this 가 person1 (person1 === 정은혜)
const person2 = new Person('정세이'); // this 가 person2 (person2 === 정세이)
console.log(person1.name); // 정은혜
console.log(person2.name); // 정세이

// ? 4. 화살표 함수와 this
const arrowObject = {
  name: 'arrow',
  showThis: () => {
    // 화살표함수는 this 의 바인딩 체계가 다름
    // >> '해당 화살표 함수가 정의된 객체'의 생성 스코프(현재 global)를 this 로 가져옴
    console.log(this);
  }
}

arrowObject.showThis(); // {} - global 전역 객체

// ! cf) 객체 내부의 this 는
// 선언적 함수, 함수 표현식 VS 화살표 함수의 this 바인딩이 다름
//  > 현재의 객체값을 활용하기 위함이기 때문에 '선언적 함수', '함수 표현식' 사용을 권장!
