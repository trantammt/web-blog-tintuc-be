// Mục đích: Định tuyến CRUD cho tag

import express from 'express';
import {
  getAllTags,
  createTag,
  updateTag,
  deleteTag
} from '../controllers/tagController.js';

const router = express.Router();

// Lấy tất cả tag
router.get('/tags', getAllTags);

// Tạo tag mới
router.post('/tags', createTag);

// Cập nhật tag theo ID
router.put('/tags/:id', updateTag);

// Xoá tag theo ID
router.delete('/tags/:id', deleteTag);

export default router;