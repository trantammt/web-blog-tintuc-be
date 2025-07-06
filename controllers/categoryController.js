// Mục đích: Xử lý CRUD category

import Category from '../models/Category.js';

// Lấy tất cả category
export async function getAllCategories(req, res) {
  const categories = await Category.findAll();
  res.json(categories);
}

// Tạo category mới
export async function createCategory(req, res) {
  const { name, slug } = req.body;
  try {
    const category = await Category.create({ name, slug });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tạo category', error: err.message });
  }
}

// Cập nhật category
export async function updateCategory(req, res) {
  const { name, slug } = req.body;
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ message: 'Không tìm thấy category' });
  await category.update({ name, slug });
  res.json(category);
}

// Xoá category
export async function deleteCategory(req, res) {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ message: 'Không tìm thấy category' });
  await category.destroy();
  res.json({ message: 'Đã xoá category' });
}