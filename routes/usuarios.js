const { Router } = require('express');
const { check, validationResult } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido,emailExiste, existeUsuarioPorId} = require('../helpers/db-validators')

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete
     } = require('../controllers/usuarios');
const router = Router();

router.get('/', usuariosGet)

router.post('/',[
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('password', 'El password es obligatorio y mas de 6 caracteres').isLength({ min: 6 }),
     // check('correo', 'Correo no valido').isEmail(),
     check('correo').custom( emailExiste ),
     // check('rol', 'Rol no valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
     //NOTA COMO EL PRIMER ARRGUMENTO QUE SE LE MANDA AL ROL ES EL MISMO QUE SE MANDA A LA FUNCION ROLEVALID
     // SE MANDA SOLO LA REFERENCIA DE LA FUNCION
     check('rol').custom( esRoleValido ), 
     validarCampos

],usuariosPost)

router.put('/:id',[
     check('id', 'No es un ID valido').isMongoId(),
     check('id').custom( existeUsuarioPorId ),
     check('rol').custom( esRoleValido ), 
     validarCampos

], usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/:id',[
     check('id', 'No es un ID valido').isMongoId(),
     check('id').custom( existeUsuarioPorId ),
     validarCampos
], usuariosDelete)

module.exports = router