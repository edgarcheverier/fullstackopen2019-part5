import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll } from './services/blogs';
import { loginUser } from './services/login';

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAll().then(data => setBlogs(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(name, password).then(data => setUser(data));
  }

  const loginForm = () => {
    return (
      <>
        <h1>Log in to application</h1>
        <form onSubmit={handleSubmit}>
            username
            <input value={name} onChange={({ target }) => setName(target.value)} />
            password
            <input value={password} onChange={({ target }) => setPassword(target.value)} />
            <button type='submit'>login</button>
        </form>
      </>
    )
  };

  const displayBlogs = () => {
    if (blogs.length) {
      return (
        <div>
          <h1>blogs</h1>
          <h3>{user.name} logged in</h3>
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
