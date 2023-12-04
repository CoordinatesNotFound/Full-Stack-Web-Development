const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
  console.log("done");
});

describe("get /api/blogs", () => {
  test("all blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("should have id as the unique identifier", async () => {
    const blog = new Blog({
      title: "test3",
      author: "author3",
      url: "http://example.com/test3",
    });

    await blog.save();

    const savedBlog = await Blog.findOne({ title: blog.title });

    expect(savedBlog.id).toBeDefined();
  });
});

describe("post /api/blogs", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "added post",
      author: "author1",
      url: "test",
      likes: 13,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain(
      newBlog.title,
    );
  });

  test("likes set default to 0 if missing", async () => {
    const newBlog = {
      title: "added blog",
      author: "author1",
      url: "test",
    };
    const response = await api
      .post("/api/blogs")
      .send(newBlog);

    expect(response.body.likes).toBe(0);
  });

  test("400 if title missing", async () => {
    const newBlog = {
      author: "author1",
      url: "test",
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400);
  });

  test("400 if url missing", async () => {
    const newBlog = {
      title: "added blog",
      author: "author1",
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400);
  });
});

describe("delete /api/blogs", () => {
  test("a blog can be deleted", async () => {
    const blog = new Blog({
      title: "test3",
      author: "author3",
      url: "http://example.com/test3",
    });

    await blog.save();

    const savedBlog = await Blog.findOne({ title: blog.title });
    await api
      .delete(`/api/blogs/${savedBlog._id}`)
      .expect(204);
  });
});

describe("put /api/blogs", () => {
  test("a blog can be updated", async () => {

    const blog = await Blog.findOne({ title: "test1" });

    const updatedBlog = {
      title: "test1",
      author: "author1",
      url: "http://example.com/test1",
      likes: 2,
    };

    await api
      .put(`/api/blogs/${blog._id}`)
      .send(updatedBlog)
      .expect(200);

    const result = await Blog.findOne({ title: "test1" });
    console.log(result);
    expect(result.likes).toBe(updatedBlog.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
