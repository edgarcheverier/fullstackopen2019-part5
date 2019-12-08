import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import { getAll } from './services/blogs';
import { loginUser } from './services/login';
import Notifications from './components/Notifications';
import { useField } from './hooks/index';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [showNotifications, setshowNotifications] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const nameField = useField('text');
  const passwordField = useField('password');

  useEffect(() => {
    getAll().then(data => setBlogs(data));
    const loggedUser = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(nameField.value, passwordField.value)
      .then(data => {
        setUser(data);
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(data));
        setshowNotifications(true);
        setMessage(`${data.name} succesfully logged in`);
        nameField.setValue('');
        passwordField.setValue('');
        setTimeout(() => {
          setshowNotifications(false);
          setMessage('');
        }, 5000)
      })
      .catch((error) => {
        setError(true);
        setMessage(error.message);
        setshowNotifications(true);
        setTimeout(() => {
          setshowNotifications(false);
          setMessage('');
          setError(false);
        }, 5000)
      });
  }

  const loginForm = () => {
    return (
      <>
        <h1>Log in to application</h1>
        {showNotifications && <Notifications error={error} message={message} />}
        <form onSubmit={handleSubmit}>
          username
          <input type={nameField.type} value={nameField.value} onChange={nameField.onChange} />
          password
          <input type={passwordField.type} value={passwordField.value} onChange={passwordField.onChange} />
          <button type='submit'>login</button>
        </form>
      </>
    )
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  const displayBlogs = () => {
    if (blogs.length) {
      return (
        <div>
          <h1>blogs</h1>
          {showNotifications && <Notifications error={error} message={message} />}
          <h3>{user.name} logged in</h3>
          <button onClick={handleLogout}>logout</button>
          <CreateBlog
            token={user.token}
            blogs={blogs}
            setBlogs={setBlogs}
            setshowNotifications={setshowNotifications}
            setError={setError}
            setMessage={setMessage}/>
          {blogs.map(blog => <Blog key={blog.id}  blog={blog} />)}
        </div>
      )
    }
  };

  return (
    <div>
      { user ? displayBlogs() : loginForm()}
    </div>
  );
}

export default App;
