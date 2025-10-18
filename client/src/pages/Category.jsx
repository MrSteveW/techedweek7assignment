import { useParams, Outlet } from "react-router";
import { useEffect, useState } from "react";
import Post from "./Post";

export default function Category() {
  const params = useParams(); //grabs the paramater from the URL
  const [categoryPosts, setCategoryPosts] = useState(null);
  const [categoryName, setCategoryName] = useState(null);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/category/${params.id}`
      );
      const data = await response.json();
      setCategoryPosts(data);

      // Set category name from the first post (if any posts exist)
      if (data && data.length > 0) {
        setCategoryName(data[0].category);
      }
    }
    fetchData();
  }, [params.id]);

  return (
    <div>
      <div>You are looking at page {categoryName} </div>
      <div className="border-1">
        {categoryPosts ? (
          categoryPosts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              title={post.title}
              content={post.content}
              reaction={post.reaction}
              created_at={post.created_at}
              tags={post.tag}
            />
          ))
        ) : (
          <div>Loading posts...</div>
        )}
      </div>
    </div>
  );
}
