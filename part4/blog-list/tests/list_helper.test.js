const listHelper = require('../utils/list_helper');

const emptyBlogList = [];

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const blogList = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlogList);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated rigth', () => {
    const result = listHelper.totalLikes(blogList);
    expect(result).toBe(27);
  });
});

describe('favorite blog/s', () => {
  
  test('of list with only one blog is that blog', () => {
    // result is an array because favoriteBlogs return the blog/s with the most likes
    const result = listHelper.favoriteBlogs(listWithOneBlog);
    expect(result[0]).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });
});

describe('author with the most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs(emptyBlogList);
    expect(result).toBe(null);
  });

  test('of list with one blog is that same author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });
  
  test('of bigger list is found correctly', () => {
    const result = listHelper.mostBlogs(blogList);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 });
  });
});

describe('author with the most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes(emptyBlogList);
    expect(result).toBe(null);
  });

  test('of list with one blog is that same author', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('of bigger list is found correctly', () => {
    const result = listHelper.mostLikes(blogList);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});