
const {Router} = require('express')

const postController = require('../controller/postController')

const authMiddleware = require('../middleware/tokenMiddleware')
const {getAllPosts, deletePost,getPost} = require('../controller/postController')


router.get('/posts', authMiddleware, createPost)
router.get('/posts', authMiddleware, getAllPosts)
router.put('/posts/:id', authMiddleware, getPost)
router.put('/posts/:id', authMiddleware, updatePost)
router.delete('/posts/:id', authMiddleware, deletePost)