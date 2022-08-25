const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const cors = require('cors');
const path = require('path');
const express = require('express');

server.use(cors());

server.use(express.static(path.join(__dirname+'/dist')))

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

const PORT = process.env.PORT || 8000;

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

server.use(router);
server.listen(PORT, () => {
  console.log('Server is running');
});

