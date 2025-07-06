// Mục đích: Xác thực người dùng và trả về JWT token

import express from 'express';                       // Express Router
import bcrypt from 'bcryptjs';                       // Thư viện mã hoá password
import User from '../models/User.js';                // Sequelize model người dùng
import { generateToken } from '../utils/jwt.js';     // Hàm tạo token JWT

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Đăng nhập hệ thống
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập bằng email và mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về token
 *       400:
 *         description: Email không tồn tại
 *       401:
 *         description: Sai mật khẩu
 *       500:
 *         description: Lỗi server
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Sai mật khẩu' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

export default router;