// Mục đích: Xử lý các thao tác thêm, lấy bình luận cho bài viết

import Comment from '../models/Comment.js';

/**
 * Lấy tất cả bình luận của một bài viết
 * Route: GET /api/posts/:postId/comments
 */
export async function getCommentsByPost(req, res) {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { post_id: postId } });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy bình luận', error: err.message });
  }
}

/**
 * Thêm bình luận mới vào bài viết
 * Route: POST /api/posts/:postId/comments
 */
export async function addComment(req, res) {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const newComment = await Comment.create({
      post_id: postId,
      user_id: req.user.id,
      content
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm bình luận', error: err.message });
  }
}