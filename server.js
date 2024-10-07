const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs');
const path = require('path'); 
const app = express();
const port = 3000;
const cors = require('cors');
const fetchPosts = require('./fetchPosts');

app.use(cors()); 
app.use(bodyParser.json());

// Path to posts.json
const postsFilePath = path.join(__dirname, 'posts.json');

const readPostsFromFile = () => {
  try {
    fetchPosts();
    const data = fs.readFileSync(postsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writePostsToFile = (posts) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};

// Load Swagger documentation
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 1. Create a blog post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const posts = readPostsFromFile();
  const newPost = { id: posts.length + 1, title, content, createdAt: new Date() };
  posts.push(newPost);
  writePostsToFile(posts);

  res.status(201).json(newPost);
});

// 2. Get all blog posts
app.get('/api/posts', (req, res) => {
  const posts = readPostsFromFile();
  res.json(posts);
});

// 3. Get a blog post by ID
app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const posts = readPostsFromFile();
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// 4. Update a blog post
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const posts = readPostsFromFile();
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content } = req.body;
  if (title) posts[postIndex].title = title;
  if (content) posts[postIndex].content = content;

  writePostsToFile(posts);
  res.json(posts[postIndex]);
});

// 5. Delete a blog post
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const posts = readPostsFromFile();
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(postIndex, 1);
  writePostsToFile(posts);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});