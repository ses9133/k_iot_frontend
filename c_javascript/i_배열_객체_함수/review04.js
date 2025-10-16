/*
  학생 성적 관리 시스템
  
  # 학생 객체 데이터
  - id
  - name
  - scores: 각 과목별 성적을 저장하는 객체 ex. { Math: 85, English: 90 }

  ! 1) Student 클래스
    - 생성자에 의해 id, name, scores 초기화
  ? cf) JS 생성자: constructor
    - 생성자 내부의 this 로 호출되는 변수는 필드로 자동 선언

  - getAverageScore() 메서드 구현
    : 학생 평균 성적 계산
    ? Object.values(), reduce() 사용

  ! 2) GradeManagement 클래스
    - 학생 관리 배열, 자동 증가 id 저장
    - 학생 추가: addStudent(name, scores)
    - 학생별 평균 계산: getAverageScore()
      > 모든 학생의 id, 이름, 평균 성적을 포함하는 새로운 배열 반환
      > map(), reduce()
    - 조건에 따른 학생 필터링 & 정렬
      > getTopStudents(threshold): 평균 성적이 주어진 값(한계점) 이상인 학생을 필터링 + 내림차순 정렬 반환
      > filter(), sort()
 */

// ! 프로그램 구현
class Student {
  constructor(id, name, scores = {}) { // scores = {}: 기본 매개변수, 데이터 전달 생략될경우 기본매개변수값 할당. 필수 전달 데이터보다 뒤에 작성해야함
    this.id = id;
    this.name = name;
    this.scores = scores;
  }

  // 학생 평균 성적 계산
  getAverageScore() {
    // Object.values(객체);
    //  >> 전달된 객체의 value 값만 추출하여 배열로 반환
    //? cf) 객체는 key: value 의 쌍
    const values = Object.values(this.scores); // ex)  Object.values(this.scores) === [85, 90, 75] 
    if(values.length === 0) {
      return 0;
    }

    const sum = values.reduce((acc, cur) => acc + cur, 0);
    const avg = sum / values.length;

    // ? 숫자.toFixed(소수점자리수)
    // : 해당 소수점 자리수 이하의 자리수를 갖는 "문자열" 로 반환
    return Number(avg.toFixed(2));  // Number 로 형변환
  }
}

class GradeManagement {
  constructor() {
    this.students = [];
    this.nextId = 1;
  }

  // 학생 추가
  addStudent(name, scores) {
    const newStudent = new Student(this.nextId, name, scores);
    this.students.push(newStudent);
    console.log(`학생추가: [${newStudent.id}] ${newStudent.name}`);
    this.nextId++;
  }

  // 모든 학생의 평균 성적 배열 반환
  // 반환형태: [{id, name, average}, {id, name, average} ,,,]
  getAverageScore() {

    // ? JS 에서 {} 는 함수 본문으로 인식
    // ? 객체 리터럴 반환시 JS 에게 해당 문법 구조가 코드 블록이 아닌 객체임을 전달하기 위해 ()(소괄호) 사용
    // ? {}: 코드블록인식, ({}): 객체 리터럴로 인식
    // ? 화살표 함수에서 객체를 즉시 반환할 때는 소괄호로 감싸야함 
    return this.students.map(student => ({
      id: student.id,
      name: student.name,
      average: student.getAverageScore()
    }));
    // student: {id, name, scores} - scores 객체
    //  >       {id, name, average} 
  }

  // 조건(평균 >= threshold)에 맞는 학생 필터링후 평균 내림차순 정렬  
  getTopStudents(threshold) {
    return this.getAverageScore()
    .filter(info => info.average >= threshold) 
    //.sort(); // 오름차순 정렬
    .sort((a, b) => b.average - a.average); // 내림차순 정렬
  }

  // 편의 출력 함수
  displayAll() {
    console.log('=== 학생 목록 (평균 포함) ===');
    this.getAverageScore().forEach(info => {
      console.log(`[${info.id}] ${info.name} - 평균: ${info.average}`);
    });
  }
}

// ! === 프로그램 실행 ==== //
const gradeSystem = new GradeManagement();

// 학생 추가 예제
gradeSystem.addStudent('정은혜', { Math: 90, English: 85, Science: 78}); // 학생추가: [1] 정은혜
gradeSystem.addStudent('정세이', { Math: 80, English: 95, Science: 88}); // 학생추가: [2] 정세이
gradeSystem.addStudent('홍길동', { Math: 85, English: 100, Science: 65}); // 학생추가: [3] 홍길동
gradeSystem.addStudent('홍길서', { Math: 70, English: 80, Science: 87}); // 학생추가: [4] 홍길서

gradeSystem.displayAll();
// === 학생 목록 (평균 포함) ===
// [1] 정은혜 - 평균: 84.33
// [2] 정세이 - 평균: 87.67
// [3] 홍길동 - 평균: 83.33
// [4] 홍길서 - 평균: 79

const avgs = gradeSystem.getAverageScore();
console.log('--- 전체 평균 정보 --');
console.log(avgs);
// --- 전체 평균 정보 --
// [
//   { id: 1, name: '정은혜', average: 84.33 },
//   { id: 2, name: '정세이', average: 87.67 },
//   { id: 3, name: '홍길동', average: 83.33 },
//   { id: 4, name: '홍길서', average: 79 }
// ]

const top = gradeSystem.getTopStudents(83);
console.log("=== 평균 83점 이상 상위 학생 (내림차순) ===");
console.log(top);
// === 평균 83점 이상 상위 학생 (내림차순) ===
// [
//   { id: 2, name: '정세이', average: 87.67 },
//   { id: 1, name: '정은혜', average: 84.33 },
//   { id: 3, name: '홍길동', average: 83.33 }
// ]