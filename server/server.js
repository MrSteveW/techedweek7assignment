import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

const app = express();
// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("root_route");
});

// GET ALL POSTS
app.get("/posts", async (req, res) => {
  const posts = await db.query(
    `SELECT posts.*, ARRAY_AGG(tags.name) AS tag
     FROM posts
     JOIN posts_tags ON posts.id = posts_tags.post_id
     JOIN tags ON posts_tags.tag_id = tags.id
     GROUP BY posts.id`
  );
  res.status(200).json(posts.rows);
});

// POST NEW POST
app.post("/posts", async (req, res) => {
  try {
    console.log("req.body:", req.body); // Add this line to debug
    console.log("Content-Type:", req.headers["content-type"]); // Add this line too

    const body = req.body;
    const username = req.body.username;
    const title = req.body.title;
    const content = req.body.content;
    const reaction = req.body.reaction;

    const result = await db.query(
      "INSERT INTO posts (username, title, content, reaction) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, title, content, reaction]
    );

    res.status(201).json({
      status: "Posted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error saving message",
      error: error.message,
    });
  }
});

// DELETE POST BY ID
app.delete("/posts/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await db.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return response.status(404).json({ error: "Post not found" });
    }
    return response.status(200).json({ deleted: result.rows[0] });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// PATCH WITH A LIKE
app.patch("/posts/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { likes } = request.body;
    const result = await db.query(
      "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *",
      [likes, id]
    );
    if (result.rows.length === 0) {
      return response.status(404).json({ error: "Post not found" });
    }
    return response.status(200).json({ updated: result.rows[0] });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
