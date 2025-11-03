import type { Post } from '@/types/Post';
import React from 'react'
import { Link } from 'react-router-dom';

// PostCardProps 타입 정의
interface PostCardProps {
  post: Post;
}

function PostCard({post}: PostCardProps) {
  const { id, title, body, userId } = post;

  const handleLikeClick = () => {
    console.log(`좋아요 클릭됨: ${id}`);
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px'}}>
      <h3>
        {title.length > 30 ? title + ' (긴 제목)' : title}
      </h3>
      <p>{body}</p>
      {userId === 1 && <small>⭐ 특별회원의 글</small>}
      <div>
        <button onClick={handleLikeClick}>좋아요</button>
      </div>
      <Link to={`/practice/post/${id}`}>자세히 보기</Link>
    </div>
  )
}

export default PostCard
