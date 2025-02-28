const express = require('express');
const router = express.Router();
const {getKYC, deleteKYC,createKYC, updateKYC} = require('../controller/postController')

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createKYC);
router.get('/', authMiddleware, getKYC);
router.put('/', authMiddleware, updateKYC);
router.delete('/', authMiddleware, deleteKYC);

module.exports = router;