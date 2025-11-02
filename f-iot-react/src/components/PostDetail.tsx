import type { Post } from "@/types/Post";

export const posts: Post[] = [
  { userId: 1, id: 1, title: '첫 번째 게시글입니다.', body: '내용 내용 내용...' },
  { userId: 2, id: 2, title: '이건 조금 긴 제목의 게시글이라서 긴 제목 표시가 붙습니다. 제목이 길어요', body: '본문입니다.' },
  { userId: 1, id: 3, title: '세 번째 글', body: '특별회원의 글입니다.' }
];