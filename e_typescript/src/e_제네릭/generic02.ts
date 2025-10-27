// * 제네릭 제약 조건
// : 타입 매개변수가 특정 조건을 만족해야함을 명시
// - 제네릭 타입의 사용 범위 제한
function printLength<T>(arg: T): void {
  // console.log(arg.length); // Property 'length' does not exist on type 'T
  // > T 는 반드시 length 속성을 가진 타입 사용에 대한 조건 지정!
}

// * 제약 조건 예시
interface ILength {
  length: number;
}

// T 의 타입 변수가 반드시! ILength 인터페이스를 포함하는 타입이어야함
// '타입변수' extends '반드시포함될타입'
// > 타입 검증이 '타입 변수 지정시'에 결정됨
function constraints<T extends ILength>(arg: T): void {
  console.log(arg.length);
}

// constraints<boolean>(true); // Type 'boolean' does not satisfy the constraint 'ILength'.
// constraints<number>(123);  // -> <> 안의 타입이 ILength 의 제약조건을 만족하지 못하고 있음
constraints<string>('안녕하세요'); // 5
constraints('안녕하세요'); // 5 
// 함수 호출시 컴파일러가 알아서 타입 유추해주기 때문에 제네릭 타입 매개변수 <T> 작성은 생략해도 됨

console.log(constraints({
  length: 10, // 필수 속성만 명시되어있으면 가능 - length 속성을 반드시 포함(구조적 타이핑, 덕 타이핑)
  value: 3,
  addedOption: 'hi'
}));

// * keyof 연산자
// : 객체 속성을 '타입'으로 간주
type Type = {
  name: string;
  age: number;
}

// : 객체 형태의 타입에서 속성만 뽑아 유니온 타입으로 생성해주는 연산자
type Union = keyof Type;
// Union = "name" | "age";

let keyofValue1: Union = "name"; // 리터럴 타입
let keyofValue2: Union = "age";

// * 조건부 타입
// : 타입 매개변수에 대한 조건 표현식 사용
// - 조건 키워드 사용
type Check<T> = T extends string ? 'String' : 'Not a String'; // 타입에 따라 리터럴 타입 다르게 반환
type Type1 = Check<string>;
type Type2 = Check<number>;

let a: Type1 = 'String';
let b: Type2 = 'Not a String';
function checkType<T>(value: T): Check<T> {
  let result = typeof value === 'string' ? ('String' as Check<T>) : ('Not a String' as Check<T>);
  return result;
}

console.log(checkType('문자열전달')); // String
console.log(checkType(500)); // Not a String