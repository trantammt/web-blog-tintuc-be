// Mục đích: Định tuyến CRUD cho category

import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

// Lấy tất cả category
router.get('/categories', getAllCategories);

// Tạo category mới
router.post('/categories', createCategory);

// Cập nhật category theo ID
router.put('/categories/:id', updateCategory);

// Xoá category theo ID
router.delete('/categories/:id', deleteCategory);

export default router;