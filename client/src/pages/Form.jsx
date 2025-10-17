import { useState } from "react";

export default function FormPost({ formSubmitted, setFormSubmitted }) {
  const [formData, setFormData] = useState({});
  const [tagField, setTagField] = useState([]);

  function setTag(tag) {
    setTagField((prevTags) => [...prevTags, tag]);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        tags: tagField.join(" "),
        reaction: 0,
      }),
    });
    setFormData("");
    setTagField([]);
    setFormSubmitted(!formSubmitted);
  }

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="border-1 w-1/2">
        <form onSubmit={handleSubmit} className="">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            name="username"
            type="text"
            value={formData.username || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            name="title"
            type="text"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          <input
            name="content"
            type="text"
            value={formData.content || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="tags" className="block text-sm font-medium">
            Tags
          </label>
          <div className="flex flex-row justify-evenly">
            <div onClick={() => setTag("running")}>running</div>
            <div onClick={() => setTag("cycling")}>cycling</div>
            <div onClick={() => setTag("gym")}>gym</div>
            <div onClick={() => setTag("yoga")}>yoga</div>
            <div onClick={() => setTag("swimming")}>swimming</div>
            <div onClick={() => setTag("nutrition")}>nutrition</div>
            <div onClick={() => setTag("home works")}>home workouts</div>
            <div onClick={() => setTag("weight loss")}>weight loss</div>
            <div onClick={() => setTag("equipment")}>equipment</div>
            <div onClick={() => setTag("injury")}>injury</div>
            <div onClick={() => setTag("mental health")}>mental health</div>
          </div>
          <input
            name="tags"
            type="text"
            onChange={handleChange}
            value={tagField.join(" ") || ""}
            disabled
          />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
