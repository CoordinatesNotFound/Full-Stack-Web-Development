const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithTwoBlogs = [
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Blog Post 1",
      author: "Author 1",
      url: "http://example.com/post1",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Blog Post 2",
      author: "Author 2",
      url: "http://example.com/post2",
      likes: 20,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has two blogs, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithTwoBlogs);
    expect(result).toBe(30);
  });
});

describe("favourite blog", () => {
  const listEmpty = [];

  const listWithTwoBlogs = [
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Blog Post 1",
      author: "Author 1",
      url: "http://example.com/post1",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Blog Post 2",
      author: "Author 2",
      url: "http://example.com/post2",
      likes: 20,
      __v: 0,
    },
  ];

  test("when list is Empty, return null", () => {
    const result = listHelper.favouriteBlog(listEmpty);
    expect(result).toEqual(null);
  });

  test("when list has two blogs, equals the blog with most likes", () => {
    const result = listHelper.favouriteBlog(listWithTwoBlogs);
    const expected = {
      title: "Blog Post 2",
      author: "Author 2",
      likes: 20,
    };
    expect(result).toEqual(expected);
  });
});

describe("most blogs", () => {
  const listWithThreeBlogs = [
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Blog Post 1",
      author: "Author 1",
      url: "http://example.com/post1",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Blog Post 2",
      author: "Author 2",
      url: "http://example.com/post2",
      likes: 20,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "Blog Post 3",
      author: "Author 2",
      url: "http://example.com/post3",
      likes: 1,
      __v: 0,
    },
  ];
  test("", () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs);
    const expected = {
      author: "Author 2",
      blogs: 2,
    };
    expect(result).toEqual(expected);
  });
});

describe("most likes", () => {
  const listWithThreeBlogs = [
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Blog Post 1",
      author: "Author 1",
      url: "http://example.com/post1",
      likes: 22,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Blog Post 2",
      author: "Author 2",
      url: "http://example.com/post2",
      likes: 20,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "Blog Post 3",
      author: "Author 2",
      url: "http://example.com/post3",
      likes: 1,
      __v: 0,
    },
  ];

  test("", () => {
    const result = listHelper.mostLikes(listWithThreeBlogs);
    const expected = {
      author: "Author 1",
      likes: 22,
    };
    expect(result).toEqual(expected);
  });
});
