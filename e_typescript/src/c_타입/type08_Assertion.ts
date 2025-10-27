// * 타입 단언 (Type Assertion)
// : 개발자가 TS 컴파일러(tsc)보다 데이터 타입의 주도권을 가지는 방법
// - 컴파일러에게 '이 데이터의 타입을 내가 지정한 타입으로 간주해라' 라는 지시

// [단언 방법]
// 데이터 as 데이터타입

let someValue: any = 'this is a string';

// someValue = true; // 어떤 값이든 할당 가능하지만 개발자가 문자열로 단언하고 싶을 경우 타입단언 사용
// let length = someValue.length;
// console.log(length);

let length: number = (someValue as string).length;
console.log(length); // 16

// * 타입 단언 사용 예시
// : 웹 개발에서 DOM 요소를 조작할 때, 특정 DOM 요소를 구체적인 HTMLElement 타입으로 단언
// - TS 가 자동으로 해당 DOM 요소의 정확한 타입을 추론할 수 없음

// @ 1) HTMLElement 타입 단언
// HTMLElement: 모든 HTML 요소 타입의 최상위 타입임 
// - getElementById(), querySelector() 등올 HTML 요소를 가져올 때 
//  , 리턴받는 DOM 객체 타입은 HTMLElement 타입
// +) 해당하는 선택자의 요소가 없을 경우 null 반환

// cf) HTMLElement 타입은 각 요소들이 가진 고유한 속성에 접근할 수 없음
//! >> 각 DOM 객체가 가지는 고유한 속성에 접근하기 위해서는 반드시 타입 단언이 필

// @ 자주 쓰이는 DOM 타입 단언
// button: HTMLButtonElement
// input: HTMLInputElement
// form: HTMLFormElement
// div: HTMLDivElement
// img: HTMLImageElement

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('myButton');
  
  // * bool 속성
  // : HTML 에서는 키워드만으로 명시
  //  -> <button disabled> 버튼</button>  
  // : DOM 에서는 DOM객체명.bool 속성 = true;
  //   boolean 값으로 설정(기본값 false)
  if(button) {
    // 찾는 조건의 HTML 요소가 있는 경우
    // button.disabled = false; // 지금은 DOM 요소의 정확한 타입 단언이 안되어있어서 오류남
    (button as HTMLButtonElement).disabled = true;
  }
  // TS 컴파일러는 실시간 코드 변환을 하지 않기때문에 코드 수정시 재컴파일 실행 필요
});

// @ 2) JSON 문자열
// JSON 문자열을 분석하여 반환되는 데이터는 any 타입으로 간주
const jsonString = '{"name": "jeh", "age": 29}';
const userData1= JSON.parse(jsonString); // const userData1: any
console.log(typeof userData1); // object

type UserType = {
  name: string;
  age: number;
}

const userData2 = JSON.parse(jsonString) as UserType; // const userData2: UserType
console.log(typeof userData2); // object(typeof 는 광범위해서 UserType 가 아닌 object 라고 인식)

