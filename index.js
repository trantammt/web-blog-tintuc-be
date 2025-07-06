import dotenv from 'dotenv';                          // Load biến môi trường
import express from 'express';                        // Import Express
import sequelize from './config/database.js';         // Sequelize connect MySQL

import authRoutes from './routes/authRoutes.js';      // Định tuyến đăng nhập
import userRoutes from './routes/userRoutes.js';      // Các route xác thực

dotenv.config();

const app = express();
app.use(express.json());                              // Middleware đọc JSON body

// Gắn các route
app.use('/api/auth', authRoutes);                     // Route đăng nhập (POST /login)
app.use('/api/user', userRoutes);                     // Route lấy thông tin người dùng (/me)

// Kết nối CSDL MySQL
sequelize.authenticate()
  .then(() => console.log('✅ Kết nối MySQL thành công!'))
  .catch((err) => console.error('❌ Lỗi kết nối DB:', err));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
