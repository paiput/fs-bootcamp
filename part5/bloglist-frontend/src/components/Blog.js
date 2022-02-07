import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5
  };

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={toggleVisibility}>{showDetails ? 'hide' : 'view'}</button></p>
      <ul style={{ display: showDetails ? 'block' : 'none' }}>
        <li>{blog.url}</li>
        <li>likes 0 <button>like</button></li>
        <li>{blog.author}</li>
      </ul>
    </div>  
  );
};

export default Blog;