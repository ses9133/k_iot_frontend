import PostCard from '@/components/PostCard'
import { posts } from '@/components/PostDetail'
import React from 'react'

function PostList() {
  return (
    <div>
      <h2>게시글 목록</h2>
      {posts.map(post => (
        <PostCard key={post.id} post={post}></PostCard>
        // 왼쪽 post 는 props 이름, 오른쪽의 {post}는 현재 map에서 순회중인 객체
      ))}
    </div>
  );
}

export default PostList

