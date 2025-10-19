import { useParams, Outlet } from "react-router";
import { useEffect, useState } from "react";
import Post from "../components/Post";

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
      <div className="text-xl mb-6 text-center text-white">{categoryName} </div>
      <div>
        {categoryPosts ? (
          categoryPosts.length > 0 ? (
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
            <div className="text-xl mb-6 text-center text-white">
              No posts found for this category
            </div>
          )
        ) : (
          <div>Loading posts...</div>
        )}
      </div>
    </div>
  );
}
