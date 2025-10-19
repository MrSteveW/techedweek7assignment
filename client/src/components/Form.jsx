import { useState } from "react";

export default function Form({ formSubmitted, setFormSubmitted }) {
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
    console.log("Posting to:", `${import.meta.env.VITE_SERVER_CONN}/posts`);
    console.log("Environment variable:", import.meta.env.VITE_SERVER_CONN);
    fetch(`${import.meta.env.VITE_SERVER_CONN}/posts`, {
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
      <div className="border-1 w-1/2 bg-white text-center rounded-3xl p-2">
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
          <input
            name="tags"
            type="text"
            onChange={handleChange}
            value={tagField.join(" ") || ""}
            disabled
          />
          <div className="flex flex-wrap justify-center ml-5 mr-5">
            <div onClick={() => setTag("running")} className="form-tag">
              running
            </div>
            <div onClick={() => setTag("cycling")} className="form-tag">
              cycling
            </div>
            <div onClick={() => setTag("gym")} className="form-tag">
              gym
            </div>
            <div onClick={() => setTag("yoga")} className="form-tag">
              yoga
            </div>
            <div onClick={() => setTag("swimming")} className="form-tag">
              swimming
            </div>
            <div onClick={() => setTag("nutrition")} className="form-tag">
              nutrition
            </div>
            <div onClick={() => setTag("home works")} className="form-tag">
              home workouts
            </div>
            <div onClick={() => setTag("weight loss")} className="form-tag">
              weight loss
            </div>
            <div onClick={() => setTag("equipment")} className="form-tag">
              equipment
            </div>
            <div onClick={() => setTag("injury")} className="form-tag">
              injury
            </div>
            <div onClick={() => setTag("mental health")} className="form-tag">
              mental health
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-slate-800 text-white p-2 cursor-pointer hover:bg-violet-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
