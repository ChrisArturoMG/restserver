const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSingin } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login)


router.post('/google',[
    check('id_token', 'El id token es necesario'),
    validarCampos
], googleSingin)

module.exports = router;