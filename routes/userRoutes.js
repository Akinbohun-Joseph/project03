const {Router} = require('express')
const {register, userLogin, deleteUser } = require('../controller/userController')

const authMiddleware = require('../middleware/tokenMiddleware');
const { createPost } = require('../model/controller/postController');
const router = Router()
router.post('/signup', createUser);
router.post('/login',userLogin )
router.delete('/user', authMiddleware, deleteUser);
router.post('/kyc', authMiddleware, createKYC); 
router.post('/posts', authMiddleware, createPost); // Create post

module.exports = router

