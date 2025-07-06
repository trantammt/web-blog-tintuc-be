// Mục đích: Sequelize model ánh xạ bảng `comments` trong MySQL

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },   // Khoá chính
  post_id: { type: DataTypes.INTEGER, allowNull: false },                   // Bài viết liên quan
  user_id: { type: DataTypes.INTEGER, allowNull: false },                   // Người bình luận
  content: { type: DataTypes.TEXT, allowNull: false },                      // Nội dung bình luận
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }         // Ngày bình luận
}, {
  tableName: 'comments',
  timestamps: false
});

export default Comment