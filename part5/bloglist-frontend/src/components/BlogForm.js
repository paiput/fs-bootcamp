import { useState } from 'react';
import Notification from './Notification';

const BlogForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = event => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.createBlog({
      title,
      author,
      url
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      {props.errorMsg && <Notification type="danger" msg={props.errorMsg} />}
      {props.successMsg && <Notification type="success" msg={props.successMsg} />}
      <form onSubmit={handleSubmit}>
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