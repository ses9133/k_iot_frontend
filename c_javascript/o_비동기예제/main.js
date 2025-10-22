const apiUrl = "http://localhost:8080/api/v1/notices";

async function loadNotices() {
  const response = await fetch(apiUrl); // fetch() 함수 method 생략: "GET"
  const notices = await response.json();

  const noticeList = document.querySelector("#notice-list");
  noticeList.innerHTML = ''; // 초기화

  notices.forEach(notice => {
    const div = document.createElement('div');
    div.className = 'notice';

    div.innerHTML = `
      <strong>${notice.title}</strong> <em>(${notice.author})</em>
      <br />
      <p>${notice.content}</p>
      <small>등록일: ${new Date(notice.createdAt + "Z").toLocaleString()}</small>
    `;

    // ? .toLocaleString()
    // : 브라우저(클라이언트)의 로컬 시간대를 사용
    // > notice.createdAt 은 서버에서 생성됨 (UTC 기준 생성되는 시간)
    //    >> 브라우저는 한국 시간으로 자동 변환하지 못함
    //    >> "createdAt": "2025-10-21 12:34:56"
    //    일반적으로 브라우저에서 쓰이는 시간 형식은 "2025-10-21T12:34:56Z" (Z 를 붙이면 강제로 KTS 전환을 시킴)

    // 삭제 버튼 생성 및 이벤트 등록
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => deleteNotice(notice.id));

    noticeList.appendChild(div);
    div.appendChild(deleteBtn);
  });
}

async function addNotice() {
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  const author = document.querySelector("#author").value.trim();

  if (!title || !content || !author) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, author })
  });

  document.querySelector("#title").value = "";
  document.querySelector("#content").value = "";
  document.querySelector("#author").value = "";

  loadNotices();
}

async function deleteNotice(id) {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadNotices();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button').addEventListener('click', addNotice);
  loadNotices();
});