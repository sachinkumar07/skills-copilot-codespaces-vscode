// Create web server
// Create a web server that listens for incoming requests on port 3000.
// Handle the following requests with the correct response:

// GET /comments - return all comments
// POST /comments - create a new comment
// GET /comments/:id - return a single comment with the specified id
// PUT /comments/:id - update a single comment with the specified id
// DELETE /comments/:id - delete a single comment with the specified id
// Use the comments array that is provided in the comments.js file. To generate a unique id, you can use the shortid package.

// The server should return the correct response for the following requests:

// GET /comments
// POST /comments
// GET /comments/:id
// PUT /comments/:id
// DELETE /comments/:id
const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const comments = require("./comments");
const app = express();
app.use(bodyParser.json());

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.post("/comments", (req, res) => {
  const newComment = {
    id: shortid.generate(),
    ...req.body,
  };
  comments.push(newComment);
  res.json(newComment);
});

app.get("/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === req.params.id);
  res.json(comment);
});

app.put("/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === req.params.id);
  const index = comments.indexOf(comment);
  const updatedComment = { ...comment, ...req.body };
  comments[index] = updatedComment;
  res.json(updatedComment);
});

app.delete("/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === req.params.id);
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json({ message: "Comment deleted" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});