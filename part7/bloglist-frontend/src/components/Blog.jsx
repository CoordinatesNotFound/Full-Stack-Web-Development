import { useState } from "react";

const Blog = ({ blog, onLike, onDelete, canDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  console.log(canDelete)
  const deleteVisible = { display: canDelete ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeClick = (event) => {
    event.preventDefault();
    
    onLike(
      blog.id, 
      {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes+1,
        url: blog.url,
      }
    );
 
  }

  const deleteClick = (event) => {
    event.preventDefault();

    onDelete(
      blog.id,
      blog.title,
      blog.author
    )
  }


  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} id="view-button">view</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={likeClick} id="like-button">like</button></p>
        <p>{blog.user.name}</p>
        <button style={deleteVisible} onClick={deleteClick} id="delete-button">delete</button>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  );
};

export default Blog;
