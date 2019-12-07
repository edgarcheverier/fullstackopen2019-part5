import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='title-author-container'>
      {blog.title} {blog.author}
    </div>
    <div className='likes-container'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog;
