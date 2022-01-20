import { useState } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';

const BlogForm = ({ setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = event => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleFormSubmit = async event => {
    try {
      event.preventDefault();
      const blog = {
        title,
        author,
        url
      };
      const newBlog = await blogService.create(blog);
      setBlogs(prevValue => prevValue.concat(newBlog));
      setSuccessMsg(`a new blog: ${newBlog.title} by ${newBlog.author} added to bloglist`);
      setTitle('');
      setAuthor('');
      setUrl('');
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    } catch(error) {
      setErrorMsg(error.response.data.error);
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };
  
  return (
    <div>
      <h2>create new</h2>
      {errorMsg && <Notification type="danger" msg={errorMsg} />}
      {successMsg && <Notification type="success" msg={successMsg} />}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title-input">title:</label>
          <input 
            type="text" 
            id="title-input"
            value={title} 
            onChange={handleTitleChange} 
          />
        </div>
        <div>
          <label htmlFor="author-input">author:</label>
          <input 
            type="text" 
            id="author-input"
            value={author} 
            onChange={handleAuthorChange} 
          />
        </div>
        <div>
          <label htmlFor="url-input">url:</label>
          <input 
            type="text" 
            id="url-input"
            value={url} 
            onChange={handleUrlChange} 
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;