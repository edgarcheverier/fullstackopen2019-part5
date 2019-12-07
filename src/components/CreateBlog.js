import React, { useState } from 'react';
import { createBlog } from '../services/blogs';

const CreateBlog = ({ token, blogs, setBlogs, setshowNotifications, setError, setMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog({title, author, url}, token)
      .then(data => {
        setBlogs(blogs.concat(data));
        setTitle('');
        setAuthor('');
        setUrl('');
        setshowNotifications(true);
        setMessage(`a new blog ${data.title} by ${data.author} added`);

        setTimeout(() => {
          setshowNotifications(false);
          setMessage('');
        }, 5000)
      })
      .catch((error) => {
        setshowNotifications(true);
        setError(true);
        setMessage(error.message);
        setTimeout(() => {
          setshowNotifications(false);
          setError(false);
          setMessage('');
        }, 5000)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        title
        <input value={title} onChange={({target}) => setTitle(target.value)} />
        author
        <input value={author} onChange={({target}) => setAuthor(target.value)} />
        url
        <input value={url} onChange={({target}) => setUrl(target.value)} />
        <button type='submit'>create</button>
      </form>
    </div>
  )
};

export default CreateBlog;
