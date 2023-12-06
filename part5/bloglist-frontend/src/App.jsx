import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
// import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

function compareLikes(a, b) {
  return b.likes - a.likes;
}

const NotifyError = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
};

const NotifySuccess = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="success">
      {message}
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    blogService.getAll()
      .then((blogs) => {
        blogs.sort(compareLikes);
        setBlogs(blogs);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(user),
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const blogFormRef = useRef();

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        console.log("return", returnedBlog);
        setBlogs(blogs.concat({
          title: returnedBlog.title,
          author: returnedBlog.author,
          url: returnedBlog.url,
          likes: returnedBlog.likes,
          user: user,
          id: returnedBlog.id,
        }));
        setSuccessMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(
          error.response.data.error,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleLike = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then((returnedBlog) => {
        // console.log(blogs)
        // console.log(returnedBlog.id)
        setBlogs(blogs.map((b) =>
          b.id !== returnedBlog.id ? b : {
            title: returnedBlog.title,
            author: returnedBlog.author,
            url: returnedBlog.url,
            likes: returnedBlog.likes,
            user: user,
            id: returnedBlog.id,
          }
        ));
      });
  };

  const handleDelete = (id, title, author) => {
    const confirmed = confirm(`Delete ${title} by ${author}?`);
    if (confirmed) {
      blogService
        .deleteBlog(id)
        .then(
          setBlogs(blogs.filter((b) => b.id !== id)),
        );
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  );

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit" id="logout-button">logout</button>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>

      <NotifySuccess message={successMessage} />
      <NotifyError message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {logoutForm()}
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
        </div>
      )}
      <div className="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={handleLike}
            onDelete={handleDelete}
            canDelete={user && blog.user.name === user.name}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
