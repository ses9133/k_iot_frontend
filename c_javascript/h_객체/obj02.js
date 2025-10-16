// 객체 멤버(속성, 메서드) 접근 방법
// - 객체는 각 요소값에 대해 '키'를 통해 접근

// 1) 점 표기법
//  - 객체명.속성명, 객체명.메서드명()

// 2) 대괄호 표기법
//  - 객체명[속성명], 객체명[메서드명]  

let dog = {
  // == 프로퍼티 == 
  name: {
    last: 'choco',
    first: 'coco'
  },
  age: 3,
  color: 'white',
  favoriteToy: ['곰인형', '탱탱볼'],

  // == 메서드 == 
  bark: function() {
    console.log('멍멍');
  },

  greet: function() {
    console.log(`Hello, ${this.name}`);
    console.log(`Hello, ${this.name.last}`);
  } // 모든 멤버 구현 이후 마지막에는 콤마 X
}

// 1) 점 표기법
console.log(dog.age); // 3
console.log(dog.name.first); // coco
dog.greet();
// Hello, [object Object]
// Hello, choco

// 2) 대괄호 표기법
// : 객체명에 [] 첨부하여 '' 안에 키 값을 문자열로 전달
console.log(dog['age']); // 3
dog['bark']; // 함수 접근 (호출이 아님)
dog['bark'](); // 멍멍 - 함수 호출 (대괄호뒤에 소괄호붙여야함)

// ? +) 객체의 속성 변경
      // 객체명.속성키 = 속성값;
      // - 해당 속성키가 존재하는 경우: 객체 속성 값 재할당
      // - 해당 속성키가 존재하지 않는 경우: 객체 속성이 새로 생성됨
dog.color = 'black';
console.log(dog['color']); // black

