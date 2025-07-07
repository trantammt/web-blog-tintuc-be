// Mục đích: Xử lý logic đăng ký và đăng nhập người dùng

import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { generateToken } from '../utils/jwt.js';

/**
 * Đăng ký tài khoản mới
 * @param {*} req
 * @param {*} res
 */
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Gán role mặc định là 'user'
    const userRole = await Role.findOne({ where: { name: 'user' } });
    const newUser = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role_id: userRole?.id || 1
    });

    // Load lại user kèm role để đưa vào JWT
    const fullUser = await User.findByPk(newUser.id, {
      include: { model: Role, as: 'role' }
    });

    const token = generateToken(fullUser);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

/**
 * Đăng nhập tài khoản
 * @param {*} req
 * @param {*} res
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: { model: Role, as: 'role' }
    });

    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
