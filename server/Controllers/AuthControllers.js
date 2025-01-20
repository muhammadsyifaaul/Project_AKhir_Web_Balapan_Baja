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
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await argon2.verify(user.password, password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            req.session.user = {
                username: user.username,
                role: user.role,
                isLoggedIn: true,
            };

            res.redirect(`${process.env.CLIENT_URL}/Home`);
        } catch (error) {
            next(error);
        }
    }
];


exports.checkSession = (req, res) => {
    if (req.session.user) {
        res.status(200).json({ isLoggedIn: true, user: req.session.user });
    } else {
        res.status(200).json({ isLoggedIn: false });
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
