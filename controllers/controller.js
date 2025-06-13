const connection = require("../data/db");

const index = (req, res) => {
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Database query is not valid",
      });
    res.json(results);
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((currentPost) => currentPost.id === id);

  if (!post) {
    res.status(404).json({
      error: "404, not found",
      message: "Post non trovato",
    });
    return;
  }

  res.json({
    description: `${post.title}`,
    data: post,
  });
};

const store = (req, res) => {
  let newId = posts.length + 1;

  let { title, content, image, tags } = req.body;
  let newPost = {
    id: newId,
    title,
    content,
    image,
    tags,
  };

  posts.push(newPost);

  res.json({
    message: "Hai aggiunto un nuovo post",
    data: newPost,
  });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  const postIndex = posts.indexOf(post);

  if (!post) {
    res.status(404).json({
      error: "404, not found",
      message: "Post non trovato",
    });
    return;
  }

  let { title, content, image, tags } = req.body;
  let newPost = {
    id,
    title,
    content,
    image,
    tags,
  };

  posts.splice(postIndex, 1, newPost);

  res.json({
    newPost,
    data: posts,
  });
};

const modify = (req, res) => {
  const id = parseInt(req.params.id);
  res.json({
    description: `Modifica parziale dell'elemento ${id}`,
  });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404).json({
      error: "404, not found",
      message: "Post non trovato",
    });
    return;
  }

  const postIndex = posts.indexOf(post);
  posts.splice(postIndex, 1);

  res.sendStatus(204);
  console.log(posts);
};

module.exports = { index, show, store, update, modify, destroy };
