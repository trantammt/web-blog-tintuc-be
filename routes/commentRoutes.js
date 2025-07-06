// Mục đích: Định tuyến các API để thêm và xem bình luận theo bài viết

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getCommentsByPost, addComment } from '../controllers/commentController.js';

const router = express.Router();

// Lấy tất cả bình luận của một bài viết
// Route: GET /api/posts/:postId/comments
router.get('/posts/:postId/comments', getCommentsByPost);

// Thêm bình luận vào bài viết (cần đăng nhập)
// Route: POST /api/posts/:postId/comments
router.post('/posts/:postId/comments', authMiddleware, addComment);

export default router;