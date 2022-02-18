import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then(blogs => {
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const addBlog = async blogObject => {
    console.log(blogFormRef.current)
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs => blogs.concat(newBlog));
      setSuccessMsg(`a new blog: ${newBlog.title} by ${newBlog.author} added to bloglist`);
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    } catch(error) {
      setErrorMsg(error.response?.data?.error || error.message);
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to view all blogs</h2>
        <LoginForm setUser={setUser} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm 
          createBlog={addBlog}
          successMsg={successMsg}
          errorMsg={errorMsg}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default App;