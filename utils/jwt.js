import jwt from 'jsonwebtoken';          // Thư viện JWT
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Tạo JWT token từ user
 * @param {Object} user - object chứa id, email, role (role.name hoặc role_id)
 * @returns {string} token
 */
export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role?.name || user.role || 'user'  // Ưu tiên role.name nếu có
    },
    SECRET_KEY,
    { expiresIn: '3h' }
  );
}

/**
 * Giải mã và xác minh token JWT
 * @param {string} token
 * @returns {Object} decoded user
 */
export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

