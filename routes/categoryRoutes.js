// Mục đích: Định tuyến CRUD cho category

import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Quản lý chuyên mục bài viết
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lấy tất cả chuyên mục
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Danh sách chuyên mục
 */
router.get('/categories', getAllCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Tạo chuyên mục mới
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã tạo chuyên mục
 */
router.post('/categories', createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Cập nhật chuyên mục theo ID
 *     tags: [Categories]
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
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã cập nhật chuyên mục
 */
router.put('/categories/:id', updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Xoá chuyên mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Đã xoá chuyên mục
 */
router.delete('/categories/:id', deleteCategory);

export default router;
