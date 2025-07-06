import express from 'express';                         // Import Express Router
import authMiddleware from '../middleware/authMiddleware.js'; // Middleware xác thực JWT
import User from '../models/User.js';                  // Sequelize model User

const router = express.Router();

/**
 * Route: GET /api/user/me
 * Mục đích: Trả thông tin người dùng từ token JWT đã xác thực
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role_id'] // Chỉ trả về các trường cần thiết
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error: error.message });
  }
});

export default router;
