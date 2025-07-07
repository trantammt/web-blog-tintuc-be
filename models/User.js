// Mục đích: Định nghĩa cấu trúc bảng users và liên kết với role

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Role from './Role.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  avatar_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Thiết lập quan hệ: User thuộc về 1 Role
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

export default User;
