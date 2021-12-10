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

module.exports = {
  dummy,
  totalLikes
};