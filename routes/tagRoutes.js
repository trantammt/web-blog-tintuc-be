// Mục đích: Định tuyến CRUD cho tag

import express from 'express';
import {
  getAllTags,
  createTag,
  updateTag,
  deleteTag
} from '../controllers/tagController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Quản lý thẻ tag
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Lấy tất cả tag
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Danh sách tag
 */
router.get('/tags', getAllTags);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Tạo tag mới
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã tạo tag
 */
router.post('/tags', createTag);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Cập nhật tag theo ID
 *     tags: [Tags]
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
 *     responses:
 *       200:
 *         description: Đã cập nhật tag
 */
router.put('/tags/:id', updateTag);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Xoá tag theo ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Đã xoá tag
 */
router.delete('/tags/:id', deleteTag);

export default router;
