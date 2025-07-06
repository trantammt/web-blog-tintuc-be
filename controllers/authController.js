import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [userCheck] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (userCheck.length > 0) return res.status(400).json({ msg: 'Email đã tồn tại' });

    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, 1)', [name, email, hashed]);
    res.status(201).json({ msg: 'Đăng ký thành công' });
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi server', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(404).json({ msg: 'Không tìm thấy user' });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ msg: 'Sai mật khẩu' });

    const token = jwt.sign({ id: user.id, role: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role_id } });
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi server', error: err.message });
  }
};
