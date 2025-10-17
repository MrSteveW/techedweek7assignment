import { useState, useEffect } from "react";
import Form from "./Form";
import Post from "./Post";
import { useCount } from "./useCount";

export default function AllPosts() {
  const count = useCount();
  const [posts, setPosts] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [postReactionId, setReactionId] = useState();
  const [currentReaction, setCurrentReaction] = useState();

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchData();
  }, [count, formSubmitted]);

  // Add reaction
  useEffect(() => {
    if (!postReactionId) return; // Don't run if no post ID

    async function updateReaction() {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${postReactionId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reaction: currentReaction + 1 }),
          }
        );
        const result = await response.json();
        const postsResponse = await fetch("http://localhost:3000/posts");
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    }

    updateReaction(); // Actually call the function
  }, [postReactionId, currentReaction]);

  if (!posts) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="w-full h-140 bg-amber-200">
      <Form formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} />

      {/* MAPPING THROUGH POSTS */}
      <div className="border-1">
        Posts
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            title={post.title}
            content={post.content}
            reaction={post.reaction}
            created_at={post.created_at}
            tags={post.tag}
            setReactionId={setReactionId}
            setCurrentReaction={setCurrentReaction}
          />
        ))}
      </div>
    </div>
  );
}
