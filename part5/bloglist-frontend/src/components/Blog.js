import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, loggedUser, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [blogLikes, setBlogLikes] = useState(blog.likes);

  const blogStyle = {
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5
  };

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = async () => {
    const blogUpdate = {
      likes: blog.likes += 1
    };
    const updatedBlog = await blogService.update(blog.id, blogUpdate);
    setBlogLikes(updatedBlog.data.likes);
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      await blogService.remove(blog.id);
      setBlogs(blogs => blogs.filter(eachBlog => eachBlog.id !== blog.id));
    } else {
      return;
    }
  };

  return (
    <div className='blog' style={blogStyle}>
      <p>{blog.title} <button id='toggle-blog-button' onClick={toggleVisibility}>{showDetails ? 'hide' : 'view'}</button></p>
      <ul data-testid='blog-info' style={{ display: showDetails ? 'block' : 'none' }}>
        <li><a href={blog.url}>{blog.url}</a></li>
        <li className='likes-counter'>likes {blogLikes} <button id='like-blog-button' onClick={handleLike}>like</button></li>
        <li>{blog.author}</li>
        {loggedUser.username === blog.user.username
          ? <button onClick={handleDelete}>remove</button>
          : null}
      </ul>
    </div>
  );
};

export default Blog;