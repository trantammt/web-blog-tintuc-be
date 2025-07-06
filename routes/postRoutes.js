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

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Quản lý bài viết blog/news
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lấy danh sách bài viết đã publish
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Danh sách bài viết
 */
router.get('/', getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Xem chi tiết bài viết theo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trả về thông tin bài viết
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Tạo bài viết mới
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [blog, news]
 *               category_id:
 *                 type: integer
 *               cover_image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bài viết được tạo thành công
 *       401:
 *         description: Cần xác thực token
 */
router.post('/', authMiddleware, createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Cập nhật bài viết theo ID (chỉ tác giả)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, published, pending]
 *               type:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               cover_image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bài viết đã được cập nhật
 *       403:
 *         description: Không có quyền sửa bài viết này
 */
router.put('/:id', authMiddleware, updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Xoá bài viết theo ID (chỉ tác giả)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bài viết đã được xoá
 *       403:
 *         description: Không có quyền xoá bài viết này
 */
router.delete('/:id', authMiddleware, deletePost);

export default router;