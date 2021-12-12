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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let authors = [];
  blogs.forEach((blog) => {
    if (authors.some((author) => author === blog.author)) {
      return;
    } else {
      return authors.push(blog.author);
    }
  });

  const authorsInfo = [];

  authors.forEach((author) => {
    let blogCounter = 0;
    blogs.forEach((blog) => {
      if (blog.author === author) {
        blogCounter += 1;   
      }
    });
    if (!authorsInfo.some((author) => author.blogs > blogCounter)) {
      authorsInfo[0] = { author, blogs: blogCounter }
    }
  });

  return authorsInfo[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs
};