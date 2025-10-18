import { Link } from "react-router";
import { useState, useEffect } from "react";
import Category from "../pages/Category";

export default function Home() {
  const [tags, setTags] = useState(null);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/category");
      const data = await response.json();
      setTags(data);
    }
    fetchData();
  }, []);

  if (!tags) {
    return <div>Loading tags...</div>;
  }

  return (
    <div className="home-container text-center">
      <div className="text-xl mb-6">
        The forum for exercise, workouts and fitness
      </div>
      <div>
        <div className="text-xl mb-6">Current hot topics</div>
        <div className="cat-container mb-6">
          {tags.map((tag) => (
            <Link to={`category/${tag.id}`} key={tag.id}>
              <div className="cat-link">{tag.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
