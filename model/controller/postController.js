const Post = require('../models/Post');

// Create Post
const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { content } = req.body;

    const post = new Post({ content, author: userId });
    await post.save();

    res.status(201).json({ message: 'Post created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts for the logged-in user
const getAllPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ author: userId });
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a specific post by ID for the logged-in user
const getPost = async (req, res) => {
    try {
      const userId = req.user._id;
      const postId = req.params.id;
      const post = await Post.findOne({ _id: postId, author: userId });
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json({ post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a post by ID for the logged-in user
  const updatePost = async (req, res) => {
    try {
      const userId = req.user._id;
      const postId = req.params.id;
      const { content } = req.body;
  
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, author: userId },
        { content },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json({ message: 'Post updated', post: updatedPost });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a post by ID for the logged-in user
  const deletePost = async (req, res) => {
    try {
      const userId = req.user._id;
      const postId = req.params.id;
  
      const deletedPost = await Post.findOneAndDelete({ _id: postId, author: userId });
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json({ message: 'Post deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  