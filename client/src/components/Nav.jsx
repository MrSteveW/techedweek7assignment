import { Link } from "react-router";

export default function Nav() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/plants">Plants</Link>
      <Link to="/about">About</Link>
    </header>
  );
}
