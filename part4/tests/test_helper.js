const Blog = require("../models/blog");

const User = require('../models/user');

const initialBlogs = [
  {
    title: "test1",
    author: "author1",
    url: "http://example.com/test1",
    likes: 10,
  },
  {
    title: "test2",
    author: "author2",
    url: "http://example.com/test2",
    likes: 100,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "nonexist",
    author: "nonexist",
    url: "nonexist",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
};
