// Mục đích: Sequelize model ánh xạ bảng `posts` trong MySQL

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Định nghĩa model bài viết (post)
const Post = sequelize.define('Post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },     // Khoá chính tự tăng
  title: { type: DataTypes.STRING, allowNull: false },                        // Tiêu đề bài viết
  excerpt: DataTypes.TEXT,                                                   // Tóm tắt
  content: { type: DataTypes.TEXT('long'), allowNull: false },               // Nội dung chính
  cover_image_url: DataTypes.STRING,                                         // Ảnh bìa
  type: { type: DataTypes.ENUM('blog', 'news'), defaultValue: 'blog' },      // Loại bài viết
  views: { type: DataTypes.INTEGER, defaultValue: 0 },                       // Lượt xem
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },                       // Lượt thích
  status: { type: DataTypes.ENUM('draft', 'published', 'pending'), defaultValue: 'draft' },
  author_id: { type: DataTypes.INTEGER, allowNull: false },                  // ID người viết bài
  category_id: { type: DataTypes.INTEGER, allowNull: true }                  // ID chuyên mục
}, {
  tableName: 'posts',
  timestamps: true,                        // Sử dụng created_at và updated_at
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Post;