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
router.get('/api/check-session', authController.checkSession);
router.get('/logout',authController.logout);



module.exports = router;
