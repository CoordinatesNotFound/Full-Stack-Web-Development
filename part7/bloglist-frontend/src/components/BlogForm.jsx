import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div className="blogFormDiv">
      <h2>Post a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            id="inputTitle"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            id="inputAuthor"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            id="inputUrl"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" id="create-button">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
