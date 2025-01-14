const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authControllers');

router.get('/Home', authController.protectedRoute, (req, res) => {
    res.redirect('/Home');
});
router.get('/DataPaket', authController.protectedRoute, (req, res) => {
    res.redirect('/DataPaket');
});

router.get('/Penyedia', authController.protectedRoute, (req, res) => {
    res.redirect('/Penyedia');
});
router.get('/TenagaAhli', authController.protectedRoute, (req, res) => {
    res.redirect('/TenagaAhli');
});

router.get('/KelolaUser', authController.protectedRoute, (req, res) => {
    res.redirect('/KelolaUser');
});



module.exports = router;