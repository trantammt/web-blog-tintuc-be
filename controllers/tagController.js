// Mục đích: Xử lý CRUD tag

import Tag from '../models/Tag.js';

// Lấy tất cả tag
export async function getAllTags(req, res) {
  const tags = await Tag.findAll();
  res.json(tags);
}

// Tạo tag mới
export async function createTag(req, res) {
  const { name } = req.body;
  try {
    const tag = await Tag.create({ name });
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tạo tag', error: err.message });
  }
}

// Cập nhật tag
export async function updateTag(req, res) {
  const { name } = req.body;
  const tag = await Tag.findByPk(req.params.id);
  if (!tag) return res.status(404).json({ message: 'Không tìm thấy tag' });
  await tag.update({ name });
  res.json(tag);
}

// Xoá tag
export async function deleteTag(req, res) {
  const tag = await Tag.findByPk(req.params.id);
  if (!tag) return res.status(404).json({ message: 'Không tìm thấy tag' });
  await tag.destroy();
  res.json({ message: 'Đã xoá tag' });
}
