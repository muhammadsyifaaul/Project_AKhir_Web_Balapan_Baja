const express = require('express');
const router = express.Router();
require('dotenv').config();
const authController = require('../Controllers/authControllers');
const { getPenyedia, getTenagaAhli, getAllUser, getAllOpd, cekNpwp, cekTenagaAhli, tambahDataPaket, getAllPaket, tambahPenyedia, getPaketWithNpwp, getPaketById, tambahTenagaAhli, getAllPaketTenagaAhli, addUser, deleteUser, updateUser, editPenyedia, deletePenyedia, updateTenagaAhli, deleteTenagaAhli, deletePaket } = require('../Controllers/mainControllers');

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
router.get('/getAllPaket',getAllPaket);
router.get('/getPenyedia/:npwp',getPaketWithNpwp);
router.get('/getPaketById/:id',getPaketById)
router.get('/getAllPaketTenagaAhli/:id',getAllPaketTenagaAhli);

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
router.post('/TambahPenyedia',tambahPenyedia);
router.post('/TambahTenagaAhli',tambahTenagaAhli);
router.post('/addUser',addUser)
router.delete('/deleteUser/:id',deleteUser)
router.put('/updateUser/:id',updateUser)
router.put('/editPenyedia/:id',editPenyedia)
router.delete('/deletePenyedia/:id', deletePenyedia);
router.put("/updateTenagaAhli/:id", updateTenagaAhli);
router.delete("/deleteTenagaAhli/:id",deleteTenagaAhli);
router.delete("/deletePaket/:id",deletePaket);





module.exports = router;