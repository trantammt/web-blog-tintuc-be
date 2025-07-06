import jwt from 'jsonwebtoken';  // Thư viện JWT để tạo và verify token
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Tạo JWT token từ user
 * @param {Object} user - object chứa id, email, role_id
 * @returns {string} token
 */
export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role_id },
    SECRET_KEY,
    { expiresIn: '3h' } // Token hết hạn sau 3 tiếng
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
