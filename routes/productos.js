const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { existeCategoria,existeProductoPorId } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');

const router = Router();

//{{url}}/api/categorias
// 5 servicios Rest
//validar id 
//Obtener todas la categorias - publico
router.get('/',obtenerProductos)  

// Obtener una categoria por id - publico 
router.get('/:id',
 [
    check('id', 'No es un id valido ').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
 ]
,obtenerProducto)

//Crear una nueva categoria - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom( existeCategoria ),
    // check('categoria', 'La categoria es obligatorio').not().isEmpty(),
    // check('id').custom( existeCategoria ),
    validarCampos 
], crearProducto)

//Actualizar - privado - cualquier con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto)

//Borrar una categoria - Administradores
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'El id no es valido ').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto)


module.exports = router;