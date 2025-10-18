import "./poststyle.css";
import { Flame } from "../components/Flame";
import { Trash } from "../components/Trash";

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
  setDeleteId,
}) {
  function handleReaction(id, reaction) {
    setReactionId(id);
    setCurrentReaction(reaction);
  }
  function handleDelete(id) {
    setDeleteId(id);
  }

  return (
    <div className="page-container">
      <div className="post-container">
        <div className="post-username">{username}</div>
        <div className="post-title">{title}</div>
        <div className="post-content">{content}</div>
        <div className="post-delete" onClick={() => handleDelete(id)}>
          <Trash />
        </div>
        <div className="post-date">
          {new Date(created_at).toLocaleDateString("en-GB")}
        </div>
        <div className="post-tags">
          {tags &&
            tags.map((tag, index) => (
              <div key={index} className="post-each-tag">
                {tag}
              </div>
            ))}
        </div>
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
