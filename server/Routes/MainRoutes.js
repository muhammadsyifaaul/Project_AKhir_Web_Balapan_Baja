const express = require('express');
const router = express.Router();
require('dotenv').config();
const authController = require('../Controllers/authControllers');
const { getPenyedia, getTenagaAhli, getAllUser, getAllOpd, cekNpwp, cekTenagaAhli, tambahDataPaket } = require('../Controllers/mainControllers');

router.get('/Home', authController.protectedRoute, (req, res) => {
    res.redirect('/Home');
});
router.get('/GetUser',authController.getUser);
router.get('/getPenyedia',getPenyedia);
router.get('/getTenagaAhli',getTenagaAhli);
router.get('/getAllUser',getAllUser);
router.get('/cekTenagaAhli/', cekTenagaAhli);

router.get('/DataPaket', authController.protectedRoute, (req, res) => {
    res.redirect('/DataPaket');
});
router.get('/getAllOpd',getAllOpd);
router.get('/cekNpwp/:npwp',cekNpwp);

router.get('/Penyedia', authController.protectedRoute, (req, res) => {
    res.redirect('/Penyedia');
});
router.get('/TenagaAhli', authController.protectedRoute, (req, res) => {
    res.redirect('/TenagaAhli');
});

router.get('/KelolaUser', authController.protectedRoute, (req, res) => {
    res.redirect('/KelolaUser');
});

router.post('/TambahDataPaket',tambahDataPaket);



module.exports = router;