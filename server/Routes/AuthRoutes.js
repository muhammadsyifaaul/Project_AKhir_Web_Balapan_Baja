const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authControllers');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts. Please try again later.',
});

router.post('/Login', loginLimiter, authController.login);
router.get('/check-session', authController.checkSession);

// Add protected routes
router.get('/Home', authController.protectedRoute, (req, res) => {
    res.redirect('/Home');
});
router.get('/Penyedia', authController.protectedRoute, (req, res) => {
    res.redirect('/Penyedia');
});

// Add more protected routes as needed...

module.exports = router;
