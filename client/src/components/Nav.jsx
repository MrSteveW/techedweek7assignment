import { Link } from "react-router";

export default function Nav() {
  return (
    <nav className="bg-[#172323] text-white text-xl flex justify-between p-3 [font-family:var(--font-allerta)]">
      <div>
        <Link to="/" className="mr-4">
          Endurance
        </Link>
      </div>
      <div className="mr-4">
        <Link to="/" className="hover:text-violet-600 mr-4">
          Home
        </Link>
        <Link to="/posts" className="hover:text-violet-600 mr-4">
          Posts
        </Link>
        <Link to="/about" className="hover:text-violet-600 mr-4">
          About
        </Link>
      </div>
    </nav>
  );
}
