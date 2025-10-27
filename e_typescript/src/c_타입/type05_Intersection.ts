// * Intersection 타입
// 여러 타입을 하나로 결합하여 모든 타입의 기능을 갖춘 단일 타입 생성
// - 여러 타입을 모두 만족하는(모든 타입을 가짐) 하나의 타입
// - And 연산자
// - & 기호 사용

// [작성방법]
// type 타입별칭 = Type1 & Type2 & Type3 ...;

type Employee = {
  name: string;
  startDate: Date;
}

type Manager = Employee & { group: string };
// Employee 타입의 속성을 재사용하고, Manager 타입이 가질 수 있는 추가 속성을 지정 가능

let manager1: Manager = {
  name: 'jeh',
  group: 'education',
  startDate: new Date()
}

// * 인터섹션 타입의 특징
// 타입의 결합: 코드의 재사용성 + 복잡한 타입 조합 가능
type Admin = {
  isAdmin: boolean;
}

type User = {
  id: string;
  password: string;
} 

// 관리 사용자
type AdminUser = Admin & User;

// 사용자를 관리 사용자로 만드는 함수
function createAdminUser(user: User): AdminUser {
  // 스프레드 연산자 사용하여 새로운 객체 생성
  return { ...user, isAdmin: true };
}

let user1: User = {
  id: 'ses9133',
  password: 'asdf123'
}

let adminUser1 = createAdminUser(user1);
console.log(adminUser1); // { id: 'ses9133', password: 'asdf123', isAdmin: true } (관리사용자로 바껴있음)


