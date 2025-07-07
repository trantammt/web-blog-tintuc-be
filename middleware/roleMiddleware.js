// Mục đích: Middleware kiểm tra quyền truy cập theo role người dùng

/**
 * Middleware kiểm tra xem user có quyền truy cập không
 * @param  {...string} allowedRoles - Danh sách các role được phép truy cập (ví dụ: 'admin', 'blogger')
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Không xác định được người dùng hoặc vai trò' });
    }

    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập chức năng này' });
    }

    next();
  };
};