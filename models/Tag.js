// Mục đích: Sequelize model cho bảng `tags`

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tag = sequelize.define('Tag', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },   // Khóa chính
  name: { type: DataTypes.STRING, unique: true, allowNull: false }          // Tên tag (duy nhất)
}, {
  tableName: 'tags',
  timestamps: false
});

export default Tag;