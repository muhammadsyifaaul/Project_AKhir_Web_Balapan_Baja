const argon2 = require('argon2');
const { body, validationResult } = require('express-validator');
const User = require('../Models/User');

exports.login = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).json({ message: 'User Not Found' });
        }
  
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Password is incorrect' });
        }
  
        // Simpan sesi
        req.session.user = {
          username: user.username,
          role: user.role,
          isLoggedIn: true,
        };
  
        console.log('Session created:', req.session);
  
        // Kirim respons JSON ke frontend
        return res.status(200).json({
          message: 'Login successful',
          user: req.session.user,
        });
      } catch (error) {
        next(error);
      }
    },
  ];
  




exports.checkSession = (req, res) => {
    console.log('Checking session...');
    console.log('Session:', req.session);
    console.log('User:', req.session.user);
    if (req.session && req.session.user) {
        res.json({
            isLoggedIn: true,
            user: req.session.user
        });
    } else {
        res.json({
            isLoggedIn: false
        });
    }
};

exports.protectedRoute = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.getUser = async (req, res) => {
    // console.log(req.session.user);
    const user = req.session.user;
    res.json(req.session.user);
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Gagal menghapus sesi:", err);
        return res.status(500).json({ message: "Gagal logout" });
      }
      res.clearCookie("connect.sid", { path: "/" }); // Hapus cookie session
      return res.status(200).json({ message: "Logout berhasil" });
    });
  };
  