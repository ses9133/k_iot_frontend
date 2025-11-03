import React from 'react'
import { useParams } from 'react-router-dom'

function PostDetail() {
  const params = useParams();
  console.log(params);

  return (
    <div>
      <h1>User ID: {params.id}</h1>
    </div>
  )
}

export default PostDetail