// 타입 스크립트 객체 타입
// 1. 객체 타입 지정(명시)
// {} (중괄호) 사용
// 각 데이터별(속성별) 타입 명시의 구분은 ;(세미콜론) 사용 권장 (콤마도 사용가능)

const user: {
  name: string;
  age: number;
  favorite: any[]; // any 타입의 배열
  height: number;
} = {
  name: 'jeh',
  height: 162, 
  age: 29,
  favorite: [1, '운동', null],
  //nickname: '개구리' - 타입 명시하지 않은 속성은 정의할 수 없음
}
// 속성명과 값할당 순서 바껴도 상관없음. 

// 2. 객체의 선택 속성(선택적 프로퍼티)
// 속성명 뒤에 물음표(?)를 붙여 해당 속성이 존재하지 않을 수도 있음을 표시
const person1: {
  name: string;
  height?: number;
} = {
  name: 'jeh',
}

const person2: {
  name: string;
  height?: number;
} = {
  name: 'jeh',
  height: 162 // 작성해도 되고 안해도됨 
}

// 3. 읽기 전용 속성
// 속성명 앞에 readonly 키워드를 사용하여 해당 속성의 재할당을 금지
const readonlyUser: {
  readonly name: string;
  readonly age: number;
  address?: string;
} = {
  name: 'jeh',
  age: 29
}

// 객체명.속성명 = 재할당값;
// readonlyUser.name = 'jse'; // Cannot assign to 'name' because it is a read-only property.
// readonlyUser.age = 27; // Cannot assign to 'name' because it is a read-only property.
readonlyUser.address = '부산';
console.log(readonlyUser); // { name: 'jeh', age: 29, address: '부산' }