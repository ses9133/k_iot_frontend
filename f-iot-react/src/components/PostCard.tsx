import type { Post } from '@/types/Post';
import React from 'react'
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

const PostCard = ({post}: PostCardProps) => {
  const { id, title, body, userId } = post;

  const handleLikeClick = () => {
    console.log('좋아요 클림됨: ' + id);
  }

  return (
    <div style={{ border: '1px solid black', padding: '16px'}}>
      <h3>
        {title}
        {title.length > 30 ? '(긴 제목)' : ''}
      </h3>
      <p>{body}</p>
      {userId === 1 && <p>⭐ 특별회원의 글</p>}
      <button onClick={handleLikeClick}>좋아요</button>
      <Link to={`/posts/${id}`}>
        <button>자세히 보기</button>
      </Link>
    </div>

  )
}

export default PostCard
