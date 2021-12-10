const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const likes = blogs.map(blog => blog.likes);
  const totalLikes = likes.reduce((acum, currentValue) => acum + currentValue);
  
  return totalLikes;
};

const favoriteBlogs = (blogs) => {
  const likes = blogs.map(blog => blog.likes);
  const sortedLikes = likes.sort((a, b) => b - a);
  const mostLikes = sortedLikes[0];
  const favoriteBlogs = blogs.filter(blog => blog.likes === mostLikes);
  
  return (
    favoriteBlogs.map(blog => ({
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }))
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs
};