const axios = require('axios');
const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, 'posts.json');

const fetchPosts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    fs.writeFileSync(postsFilePath, JSON.stringify(response.data, null, 2));
    console.log('Posts fetched and saved to posts.json');
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
};

module.exports = fetchPosts;