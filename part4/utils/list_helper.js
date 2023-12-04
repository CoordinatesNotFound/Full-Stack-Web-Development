const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null; // Return null for an empty list
  }

  // Use reduce to find the blog with the most likes
  const favorite = blogs.reduce((maxLikesBlog, currentBlog) => {
    return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog;
  }, blogs[0]);

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // group the authors
  const blogsByAuthor = lodash.groupBy(blogs, "author");

  // count the blogs
  const blogsCountByAuthor = lodash.map(blogsByAuthor, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));

  // find author with most blogs
  const topAuthor = lodash.maxBy(blogsCountByAuthor, "blogs");

  return topAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  
  // group the authors
  const blogsByAuthor = lodash.groupBy(blogs, "author");

  // count the likes
  const likesByAuthor = lodash.map(blogsByAuthor, (blogs, author) => ({
    author,
    likes: lodash.sumBy(blogs, "likes"),
  }));

  // find the author with most likes
  const topAuthor = lodash.maxBy(likesByAuthor, "likes");

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
