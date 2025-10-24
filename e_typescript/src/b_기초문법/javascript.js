let message = "hello";
console.log(message.toUpperCase());

message(); // 컴파일 시점 오류 발생 하지 않음
// 실행후 오류발생 -> TypeError: message is not a function