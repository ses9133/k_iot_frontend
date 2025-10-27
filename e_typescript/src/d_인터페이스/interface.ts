// * 인터페이스 (interface)
// : 객체 (속성, 메서드 ) 구조를 정의하는 TS 기능
// +) 함수 타입 정의도 가능

// - 컴파일 시점에서 타입 체킹을 사용
//  : 다양한 구현체에 동일한 인터페이스 사용으로 일관성과 재사용성 향상

// * cf) 타입 별칭(type alias)
// : 데이터 타입 명시
// - 원시 타입, 유니온, 인터섹션 등 모든 타입을 별칭으로 지정 가능
type UserType = {
  name: string;
  age: number;
}

// * 1) 인터페이스 구현 방법
// - 인터페이스명은 대문자로 시작
// - 객체의 문법 체계 모두 사용 가능(옵셔널?, 읽기전용 readonly 다 가능)
interface IUser {
  // [이름 명명 권장 작성법]
  // 인터페이스명: I+타입명 
  // 타입별칭: 타입명Type
  name?: string;
  readonly age: number;

  // 객체 메서드 명시
  // : 메서드명(매개변수: 타입): 반환타입
  greet(name: string): void;
}

let userA: IUser = {
  age: 50,

  // greet(name) {
  //   console.log(`${name} hello ~`);
  // }

  // * 메서드 형식은 화살표 함수 사용 권장
  greet: (name) => {
    console.log(`${name} hello ~`);
  }
}

userA.greet('정은혜'); // 정은혜 hello ~

// * 2) 클래스에서 인터페이스 구현
// : implements 키워드 사용
// - 해당 타입을 가지는 클래스 정의
class Student implements IUser {
  // * ➋ 클래스의 해당 속성이 반드시 초기화 될 것을 "개발자"가 컴파일러에게 안내
  //  >> "컴파일러! 내가 책임질게! 나중에 반드시 초기화 될거야"
  //  >> Definition Assignment Assertion(정의 할당 단언) : 변수명!
  
  name!: string;
  age: number; 
  // Property 'age' has no initializer and is not definitely assigned in the constructor.
  // :  TS 클래스는 객체 속성이 생성자 내에서 초기화되지 않으면 오류 발생

  // * ➊ 클래스 필드 초기화 관련 오류 해결: 생성자에서 모두 초기화
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(name: string): void {
    console.log(`Hello1, my name is ${name}`);
    console.log(`Hello2, my name is ${this.name}`);
  }
}

const student1 = new Student('정은혜', 29); // this.name === 정은혜
student1.greet('최광섭'); // name === 최광섭

// * 인터페이스 확장
// A extends B  
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
  //color: string; (생략되어있음. 상속받았으므로)
}

let square1: Square = {
  sideLength: 10,
  color: 'red'
}

// * === interface VS type alias ===
// * 1) interface
// - extends 키워드로 확장 가능
// - 같은 인터페이스 이름으로 여러번 선언 가능(자동 병합됨)
interface A {
  a: string;
}

interface A {
  b: string;
}

interface A {
  c: string;
}
// --> interface A {a: string; b:string; c:string;}
// - implements 키워드 사용가능
// - 선언 목적: 구조 중심 객체 설계

// * 2) type alias
// - &(인터섹션)으로 확장 가능 
// - 같은 타입 별칭으로 여러번 선언 안됨
// type B = {
//   a:string;
// }

// type B = {
//   b: string;
// }

// - 원시타입, 유니언, 인터섹션, 튜플 등 모든 타입 표현 가능
// - implements 사용가능은 하나 권장 X
// - 선언 목적: 타입 조합(Union/Intersection 등) 중심