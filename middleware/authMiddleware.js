import jwt from 'jsonwebtoken'; // Import thư viện xử lý JWT
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Middleware xác thực token JWT từ header Authorization
 * Nếu hợp lệ, gán user vào req.user để dùng tiếp
 */
export default function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token không được cung cấp' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Gắn user đã giải mã vào req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}

