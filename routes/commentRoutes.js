// Mục đích: Định tuyến các API để thêm và xem bình luận theo bài viết

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getCommentsByPost, addComment } from '../controllers/commentController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Quản lý bình luận bài viết
 */

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Lấy tất cả bình luận của một bài viết
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách bình luận
 */
router.get('/posts/:postId/comments', getCommentsByPost);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Thêm bình luận vào bài viết
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bình luận đã được thêm
 */
router.post('/posts/:postId/comments', authMiddleware, addComment);

export default router;
