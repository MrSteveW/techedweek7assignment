import { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchData();
  }, []);

  if (!posts) {
    return <div>Loading posts...</div>;
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  return (
    <div className="w-full h-140 bg-amber-200">
      <div>Giving you the latest posts</div>
      <div className="form">
        <p>Form space</p>
        <form onSubmit={handleSubmit} className="border-2">
          <input name="username" onChange={handleChange} />
          <input name="title" onChange={handleChange} />
          <input name="content" onChange={handleChange} />
          <input name="tags" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* MAPPING THROUGH POSTS */}
      <div className="border-1">
        Posts
        {posts.map((post) => (
          <div key={post.id}>
            {post.username}
            {post.title}
            {post.content}
            {post.reaction}
            {post.created_at}
            {post.tag.map((tag) => (
              <div key={tag.name}> {tag} </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
