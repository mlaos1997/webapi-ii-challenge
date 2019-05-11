const express = require('express');
const server = express();

const PostsRouter = require('./data/posts-router.js');

// parses req.body to json
server.use(express.json());
server.use('/api/posts', PostsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Blog Posts</h>
    <p>Welcome to the Lambda Blog Post API</p>
  `);
});

module.exports = server;