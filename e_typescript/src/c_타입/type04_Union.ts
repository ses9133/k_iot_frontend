// Union 타입
// 여러 타입 중 하나가 될 수 있는 값을 나타내는 방법
// - 값에 허용된 타입을 두 개 이상으로 지정
// - vertical bar(|) 사용하여 표현

// [작성 방법]
// type UnionType명 = Type1 | Type2 | Type3 ...;

type VariableType = string | number | boolean | string[];

let value: VariableType = '문자';
value = 123;
value = true;
value = ['정', '은', '혜'];

// value = [1, 2, 3]; // Type 'number' is not assignable to type 'string'.

// >> TS 는 변수의 타입이 어노테이션 또는 초기화 값으로 지정됨
//   ! 유니언 타입은 타입에 대한 확장성을 가짐

// @ 예시
// 'A' 가 회원이면서 관리자
type User = {
  id: string;
  password: string;
  name: string;
  address: string;
}

type Admin = {
  id: string;
  password: string;
  department: string;
}

// 위 두가지 타입을 가지는 사이트에서 타입 별칭이 union 타입인 경우 
type AdminUser = Admin | User;

// type AdminUser = {
//   id: string;
//   password: string;
  
//   name?: string;
//   address?: string;
//   department?: string;
// }

// let jeh: AdminUser = {
//   id: 'ses9133',
//   password: 'asdf123',
//   name: '정은혜',
//   address: '부산'
// } 

let jeh: AdminUser = {
  id: 'ses9133',
  password: 'asdf123',
  department: 'it'
}
// AdminUser 별칭사용시 (name, address) 가 있거나 department 속성이 있어야함

// @ 타입 별칭에서 union 타입 사용시, 정확한 타입 지정을 위해 '타입 가드'를 사용
// cf) 타입가드: 조건문을 통해 타입을 좁혀나가는 방식
type Union = string | number;
function getAge(age: Union) {
  // 나이가 전달될 경우 - 숫자라면 소수점 자리가 없도록 반올림하고 문자열 반환(.toFixed())
  //                  - 문자라면 대문자로 변환하여 반환

  // Union 타입의 변수는 해당 Union 타입에 포함된 타입의 공통된 속성과 메서드만 사용가능
  //age.toFixed();
  //age.toUpperCase(); 
        // -> Property 'toUpperCase' does not exist on type 'Union'. Property 'toUpperCase' does not exist on type 'number'
  
  if(typeof age === 'number') {
    age = age.toFixed();
    return age;
  } else {
    age = age.toUpperCase();
    return age;
  }
}
console.log(getAge(12.345)); // 12
console.log(getAge('12 years old')); // 12 YEARS OLD