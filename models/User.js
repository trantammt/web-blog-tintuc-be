import { DataTypes } from 'sequelize';              // Sequelize types
import sequelize from '../config/database.js';     // Kết nối CSDL

/**
 * Sequelize model ánh xạ bảng users
 */
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  role_id: { type: DataTypes.INTEGER, defaultValue: 1 },
  avatar_url: DataTypes.STRING,
  bio: DataTypes.TEXT,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'users',             // Tên bảng trong MySQL
  timestamps: false               // Không dùng createdAt/updatedAt mặc định
});

export default User;
