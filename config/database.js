import { Sequelize } from 'sequelize';             // Import Sequelize constructor
import dotenv from 'dotenv';
dotenv.config();                                   // Load biến môi trường từ .env

// Khởi tạo kết nối Sequelize đến MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'tiab_blog_hybrid',       // Tên database
  process.env.DB_USER || 'root',                   // Tên người dùng
  process.env.DB_PASSWORD || '',                   // Mật khẩu DB
  {
    host: process.env.DB_HOST || 'localhost',      // Địa chỉ DB
    dialect: 'mysql',                              // Loại CSDL
    logging: false                                 // Tắt log SQL ra console
  }
);

export default sequelize;                          // Export để sử dụng ở nơi khác
