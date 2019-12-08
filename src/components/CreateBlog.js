import React, { useState } from 'react';
import { createBlog } from '../services/blogs';
import { useField } from '../hooks/index';

const CreateBlog = ({ token, blogs, setBlogs, setshowNotifications, setError, setMessage }) => {
  const [showForm, setShowForm] = useState(false);
  const titleField = useField('text');
  const authorField = useField('text');
  const urlField = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog({ title: titleField.value, author: authorField.value, url: urlField.value }, token)
      .then(data => {
        setBlogs(blogs.concat(data));
        titleField.setValue('');
        authorField.setValue('');
        urlField.setValue('');
        setshowNotifications(true);
        setMessage(`a new blog ${data.title} by ${data.author} added`);
        setShowForm(false);
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

  const displayForm = () => (
    <form onSubmit={handleSubmit}>
      title
      <input {...titleField.inputProps()} />
      author
      <input {...authorField.inputProps()} />
      url
      <input {...urlField.inputProps()} />
      <button type='submit'>create</button>
    </form>
  );

  return (
    <div>
      {showForm && displayForm()}
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'cancel' : 'new note'}</button>
    </div>
  )
};

export default CreateBlog;
