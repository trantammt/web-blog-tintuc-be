// Mục đích: Xử lý logic CRUD cho bài viết (post)

import Post from '../models/Post.js';

/**
 * Lấy danh sách tất cả bài viết đã được xuất bản
 * Route: GET /api/posts
 */
export async function getAllPosts(req, res) {
  const posts = await Post.findAll({ where: { status: 'published' } });
  res.json(posts);
}

/**
 * Lấy chi tiết 1 bài viết theo ID
 * Route: GET /api/posts/:id
 */
export async function getPostById(req, res) {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
  res.json(post);
}

/**
 * Tạo mới 1 bài viết
 * Route: POST /api/posts (cần đăng nhập)
 */
export async function createPost(req, res) {
  try {
    const { title, content, excerpt, type, category_id, cover_image_url } = req.body;
    const newPost = await Post.create({
      title, content, excerpt, type, category_id, cover_image_url,
      author_id: req.user.id,
      status: 'draft'  // Bài viết mặc định là bản nháp
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tạo bài viết', error: err.message });
  }
}

/**
 * Cập nhật nội dung bài viết (chỉ tác giả mới được sửa)
 * Route: PUT /api/posts/:id
 */
export async function updatePost(req, res) {
  const post = await Post.findByPk(req.params.id);
  if (!post || post.author_id !== req.user.id) {
    return res.status(403).json({ message: 'Không có quyền sửa bài viết này' });
  }
  const { title, content, excerpt, status, type, category_id, cover_image_url } = req.body;
  await post.update({ title, content, excerpt, status, type, category_id, cover_image_url });
  res.json(post);
}

/**
 * Xoá bài viết (chỉ tác giả mới được xoá)
 * Route: DELETE /api/posts/:id
 */
export async function deletePost(req, res) {
  const post = await Post.findByPk(req.params.id);
  if (!post || post.author_id !== req.user.id) {
    return res.status(403).json({ message: 'Không có quyền xoá bài viết này' });
  }
  await post.destroy();
  res.json({ message: 'Xoá thành công' });
}
