import "./poststyle.css";
import { Flame } from "../components/Flame";

export default function Posts({
  id,
  username,
  title,
  content,
  reaction,
  created_at,
  tags,
  setReactionId,
  setCurrentReaction,
}) {
  function handleReaction(id, reaction) {
    setReactionId(id);
    setCurrentReaction(reaction);
  }

  return (
    <div className="page-container">
      <div className="post-container">
        <div className="post-username">{username}</div>
        <div className="post-title">{title}</div>
        <div className="post-content">{content}</div>
        <div className="post-delete">DEL</div>
        <div className="post-date">
          {new Date(created_at).toLocaleDateString("en-GB")}
        </div>
        <div className="post-tags">{tags}</div>
        <div
          className="post-reaction"
          onClick={() => handleReaction(id, reaction)}
        >
          <Flame /> {reaction}
        </div>
      </div>
    </div>
  );
}
