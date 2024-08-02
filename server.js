require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
  {
    username: "Mark",
    title: "Post 1",
  },
  {
    username: "Jin",
    title: "Post 2",
  },
];

app.get("/posts", authencateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

function authencateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
