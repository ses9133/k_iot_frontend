// posts.ts 
// : Post 타입의 게시글 데이터를 저장하는 배열 (Post[])

import type { Post } from "@/types/Post";

// * mock data
// - 실제 데이터가 아닌, 개발 및 테스르르 목적으로 만든 임의의 가짜 샘플

export const posts: Post[] = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum..."
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque..."
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad..."
  }
];