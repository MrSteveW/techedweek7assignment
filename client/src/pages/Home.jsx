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

  console.log(tags);
  if (!tags) {
    return <div>Loading tags...</div>;
  }

  return (
    <div>
      <div>Endurance</div>
      <div>The forum for exercise, workouts and fitness</div>
      <div>
        {tags.map((tag) => (
          <Link to={`category/${tag.id}`} key={tag.id}>
            {tag.name}
          </Link>
        ))}
      </div>
      ;
    </div>
  );
}
