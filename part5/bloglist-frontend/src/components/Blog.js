import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
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
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    };
    const updatedBlog = await blogService.update(blog.id, blogUpdate);
    setBlogLikes(updatedBlog.data.likes);
  };

  return (
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={toggleVisibility}>{showDetails ? 'hide' : 'view'}</button></p>
      <ul style={{ display: showDetails ? 'block' : 'none' }}>
        <li><a href={blog.url}>{blog.url}</a></li>
        <li>likes {blogLikes} <button onClick={handleLike}>like</button></li>
        <li>{blog.author}</li>
      </ul>
    </div>  
  );
};

export default Blog;