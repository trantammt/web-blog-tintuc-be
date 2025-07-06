// Mục đích: Định nghĩa các endpoint CRUD cho bài viết

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';

const router = express.Router();

// Lấy danh sách bài viết đã publish (ai cũng xem được)
// Route: GET /api/posts
router.get('/', getAllPosts);

// Xem chi tiết bài viết theo ID (ai cũng xem được)
// Route: GET /api/posts/:id
router.get('/:id', getPostById);

// Tạo mới bài viết (chỉ người dùng đã đăng nhập)
// Route: POST /api/posts
router.post('/', authMiddleware, createPost);

// Cập nhật bài viết (chỉ tác giả mới được sửa)
// Route: PUT /api/posts/:id
router.put('/:id', authMiddleware, updatePost);

// Xoá bài viết (chỉ tác giả mới được xoá)
// Route: DELETE /api/posts/:id
router.delete('/:id', authMiddleware, deletePost);

export default router;
