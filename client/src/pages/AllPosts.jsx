import { useState, useEffect } from "react";
import Form from "./Form";
import Post from "./Post";
import { useCount } from "./useCount";

export default function AllPosts() {
  const count = useCount();
  const [posts, setPosts] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchData();
  }, [count, formSubmitted]);

  if (!posts) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="w-full h-140 bg-amber-200">
      <div>Count: {count}</div>
      <Form formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} />

      {/* MAPPING THROUGH POSTS */}
      <div className="border-1">
        Posts
        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.username}
            title={post.title}
            content={post.content}
            reaction={post.reaction}
            created_at={post.created_at}
            tags={post.tag}
          />
        ))}
      </div>
    </div>
  );
}
