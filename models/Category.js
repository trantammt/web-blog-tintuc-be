// Mục đích: Sequelize model cho bảng `categories`

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },   // Khóa chính
  name: { type: DataTypes.STRING, unique: true, allowNull: false },         // Tên chuyên mục
  slug: { type: DataTypes.STRING, unique: true, allowNull: false }          // Slug URL-friendly
}, {
  tableName: 'categories',
  timestamps: false
});

export default Category;