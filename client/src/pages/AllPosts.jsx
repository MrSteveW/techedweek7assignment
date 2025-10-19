import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import Form from "../components/Form";
import Post from "../components/Post";
import { useCount } from "../components/useCount";
import "../components/poststyle.css";

export default function AllPosts() {
  const count = useCount();
  const [posts, setPosts] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [postReactionId, setReactionId] = useState();
  const [currentReaction, setCurrentReaction] = useState();
  const [deleteId, setDeleteId] = useState();
  const [params, setSearchParams] = useSearchParams();

  // Create sorted posts only when posts is available
  let sortedPosts = posts ? [...posts] : [];

  if (posts && params.get("sortBy") === "recent") {
    sortedPosts = sortedPosts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (posts && params.get("sortBy") === "reactions") {
    sortedPosts = sortedPosts.sort((a, b) => b.reaction - a.reaction);
  }

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${import.meta.env.VITE_SERVER_CONN}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    fetchData();
  }, [count, formSubmitted]);

  useEffect(() => {
    async function deletePost() {
      // Confirm inline — no variable needed
      if (!window.confirm("Are you sure you wish to delete post?")) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_CONN}/posts/${deleteId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        const postsResponse = await fetch(
          `${import.meta.env.VITE_SERVER_CONN}/posts`
        );
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    }

    if (deleteId) {
      deletePost();
    }
  }, [deleteId]);

  // Add reaction
  useEffect(() => {
    async function updateReaction() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_CONN}/posts/${postReactionId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reaction: currentReaction + 1 }),
          }
        );
        const result = await response.json();
        const postsResponse = await fetch(
          `${import.meta.env.VITE_SERVER_CONN}/posts`
        );
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
    <div className="w-full h-140">
      <Form formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} />

      {/* MAPPING THROUGH POSTS */}
      <div className="w-1/3 text-center">
        <select
          value={params.get("sortBy") || ""}
          onChange={(event) => setSearchParams({ sortBy: event.target.value })}
        >
          <option value="recent">Most recent</option>
          <option value="reactions">Most reactions</option>
        </select>
      </div>

      <div className="posts-container">
        {sortedPosts.map((post) => (
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
            setDeleteId={setDeleteId}
          />
        ))}
      </div>
    </div>
  );
}
