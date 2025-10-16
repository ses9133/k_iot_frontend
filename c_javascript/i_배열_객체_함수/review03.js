// # 도서관 관리 시스템
// : 도서관의 책 관리 시스템을 구현

// ! 1. 프로젝트 데이터 정의
// 1) 도서관 - 객체
// 속성: 여러 도서
// 기능: 도서 추가 / 도서 목록 출력 / 특정 도서 대여 / 특정 도서 반납


// 2) 책 - 객체
// 속성: 책 고유 ID, 책 제목, 책 저자, 책 대여 가능 여부

/*
  - Library 객체 예시 (리터럴)
  let exampleLibrary = {
    books: [], - 도서관의 책 목록을 저장

    메서드 정의...
  }

  - Book 객체 예시 (리터럴)
let exampleBook = {
  id: 1,
  title: '책 목록',
  author: '책 저자',
  isAvailable: true // 기본값
}
*/

// ! == 2. 프로젝트 구현 === //
// ? Book 클래스: 각 책의 정보 저장 & 대여, 반납 기능 정의
class Book {
  
  // 생성자 함수
  constructor(id, title, author) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.isAvailable = true;
  }

  // +) 책 내부 기능 - 대여 기능 
  // 객체명.rentBook(); -> 메서드를 호출한 해당 책(객체)의 대여!
  rentBook() {
    if(this.isAvailable) {
      this.isAvailable = false;
      console.log(`${this.title} 이 성공적으로 대여되었습니다.`);
    }
  }

  // +) 책 내부 기능 - 반납 기능
  returnBook() {
    if(!this.isAvailable) {
      this.isAvailable = true;
      console.log(`${this.title} 이 성공적으로 반납되었습니다.`);
    }
  }
}

// ? Library 클래스: Book 객체 목록 관리 & 추가 기능 구현
class Library {
  constructor() {
    this.books = []; // 빈배열- 초기에는 책 없음
    this.nextBookId = 1;
  }

  // # 책 등록
  addBook(title, author) {
    const newBook = new Book(this.nextBookId, title, author);
    this.books.push(newBook); // this(Library 객체), books(객체의 속성 (여기서는 배열))
    console.log(`${title}책이 도서관에 추가되었습니다. (저자: ${author})`);
    
    this.nextBookId++;
  }

  // # 책 정보 조회
  displayBook() {
    console.log('=== Library === ');
    this.books.forEach(book => {
      console.log(`${book.id}: ${book.title} by ${book.author} - ${book.isAvailable ? '대여 가능' : '대여 중'}`);
    })
  }

  // # 책 대여
  rentBook(id) {
    // find() => 찾는 요소가 없으면 undefined 반환
    const book = this.books.find(book => book.id === id);
    if(book) {
      // 해당 책이 도서관에 등록된 경우 - 책 객체의 내부 메서드 호출
      book.rentBook();
    } else {
      console.log('해당하는 책을 찾을 수 없습니다.');
    }
  }

  returnBook(id) {
    const book = this.books.find(book => book.id === id);

    if(book) {
      // 해당 책이 도서관에 등록된 경우
      book.returnBook();
    } else {
      console.log('해당 책을 찾을 수 없습니다.');
    }
  }

  // # 책 정보 수정
  updateBook(id, newTitle, newAuthor) {
    const book = this.books.find(book => book.id === id);
    if(!book) {
      // 해당 서적이 도서관에 등록되어있지 않은 상태
      console.log('해당 책을 찾을 수 없습니다.');
      return;
    } 

    // 등록된 책이라면 수정해야함
    // 1) 매개변수 유효성 확인
    const isNewTitleValid = newTitle && newTitle.trim().length > 0; // null, undefined 검증 && ''(빈문자열) 검증
    const isNewAuthorValid = newAuthor && newAuthor.trim().length > 0;

    if(!isNewTitleValid && !isNewAuthorValid) {
      console.log('제목 또는 저자 중 하나는 반드시 수정되어야합니다.');
      return;
    }

    // 2) 책 정보 수정
    // newTitle 이 있으면 newTitle , 없으면 기존 책 이름(book.title)
    book.title = newTitle || book.title;
    book.author = newAuthor || book.author;

    console.log(`책(id: ${book.id}) 정보가 업데이트 되었습니다. 제목 - ${book.title}, 저자 - ${book.author}`);
  }

  // # 책 삭제
  removeBook(id) {
    const idx = this.books.findIndex(book => book.id === id);
    if(idx !== -1) {
      const removedBook = this.books.splice(idx, 1)[0];
      // const [removedBook] = this.books.spliec(idx, 1); 과 같음

      console.log(`${removedBook.title} (id: ${removedBook.id}) 책이 도서관에서 삭제되었습니다.`);
    } else {
      console.log('해당 책을 찾을 수 없습니다.');
    }
  }

// % === 추가 기능 구현 === //
// [필터링] 
// 저자별 도서 필터링
filterBooksByAuthor(author) {
  // 일치하는 저자를 필터링
  // > 전체 목록 순회 + author 값 일치하는 경우 새로운 배열 반환

  // +) 검색값은 대소문자 구분하지 않고 toLowerCase() 로 두 값의 형태 일치시킬것
  const filtered = this.books.filter(book => book.author.toLowerCase() === author.toLowerCase());
  
  console.log(`=== ${author} 의 책 목록 ===`);
  filtered.forEach(book => {
    console.log(`${book.id}: ${book.title} - ${book.isAvailable ? '대여가능' : '대여중'}`);
  });
}

// 제목 키워드로 도서 검색 
filterBooksByTitle(keyword) {
  // 전체 목록 순회하여 각 데이터의 title 값에 매개변수의 keyowrd 값이 포함된 경우, 새로운 배열 반환
  const filterd = this.books.filter(book => book.title.toLowerCase().includes(keyword.toLowerCase()));
  console.log(`=== 제목에 ${keyword} 가 포함된 책 목록 ===`);
  filterd.forEach(book => {
    console.log(`${book.id}: ${book.title} - ${book.isAvailable ? '대여가능' : '대여중'}`);
  });
}

// 대여 가능 여부로 도서 필터링
filterBooksByAvailable(isAvailable) {
  // +) isAvailable 값이 true 면 ${대여가능}
  //                    , false 면 ${대여중} 인 책 목록 반환
  const status = isAvailable ? '대여가능' : '대여중';
  const filtered = this.books.filter(book => book.isAvailable === isAvailable);

  console.log(`=== ${status} 인 책 목록 ===`);
  filtered.forEach(book => {
    console.log(`${book.id}: ${book.title} by ${book.author}`);
  });
}

// [통계]
// 대여 가능 도서 수 집계
countAvailableBooks() {
  // isAvailable 이 true 인 데이터만 추출하여 해당 배열의 길이를 측정
  const count = this.books.filter(book => book.isAvailable).length;
  console.log(`대여 가능한 도서 수: ${count}`);
}

}

// ! 3. 프로젝트 실행
const busanLibrary = new Library();
busanLibrary.addBook('자바스크립트', '이승아');
busanLibrary.addBook('수제비', '정은혜');
busanLibrary.addBook('시나공', '정세이');
busanLibrary.addBook('홍달샘의 모의고사', '홍달샘');

busanLibrary.displayBook();

busanLibrary.rentBook(1);
busanLibrary.displayBook();
busanLibrary.returnBook(1);
busanLibrary.displayBook();

busanLibrary.updateBook(2, '수제비 2025', null);
busanLibrary.updateBook(2, null, '정은혜2');

busanLibrary.filterBooksByAuthor('정은혜2');
busanLibrary.filterBooksByTitle('스크립트');
busanLibrary.rentBook(1);
busanLibrary.rentBook(3);

busanLibrary.filterBooksByAvailable(true);
busanLibrary.filterBooksByAvailable(false);

busanLibrary.countAvailableBooks();
