// # 논리 연산자
//  : 논리값을 연산(boolean 값 반환)

// 논리곱) AND 연산 (&&)

// 논리합) OR 연산(||)

// 부정논리) NOT 연산(!)
let bool1 = true;
let bool2 = false;

console.log(bool1 && bool2);
console.log(bool1 || bool2);
console.log(!bool1);

// # 삼항(조건) 연산자
// : 유일하게 피연산자를 3개 가지는 조건 연산자

// ? 기본 구조
// 표현식 ? 참일경우반환값 : 거짓일경우반환값

let age = 21;
let beverage = age >= 20 ? 'Beer' : 'Juice';
console.log(beverage);

let isMember = false;
let discount = isMember ? '10%' : '5%';
console.log(discount);

age = 19;
let identity = age > 20 ? '성인' 
            : (age <= 13) ? '어린이'
            : '청소년';
console.log(identity);

// ? 덧셈 연산자
// - 타입이 모두 숫자인 경우에만: 산술 연산의 덧셈
// - 타입이 하나라도 문자열인 경우: 문자열의 결합
console.log('안녕' + 2 + 3 + '하세요');

// 초기 JS 설계 결함으로 null 데이터 타입은 object 반환

