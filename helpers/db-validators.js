const Role = require('../models/rol')
const {Usuario, Categoria, Producto} = require('../models')

const esRoleValido = async(rol = '')=>{
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
         throw new Error(`El rol ${ rol } no esta registrado en la base de datos`);
    }
}

const existeUsuarioPorId = async(id = '')=>{
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error (`El id no existe ${ id }`);    
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error (`El correo ${ correo } ya esta registrado`);    
    }
}

// Validaciones personalizadas

const existeCategoria = async(id = '')=>{
    const existeLaCategoria = Categoria.findById( id );
    if( !existeLaCategoria ){
        throw new Error (`El id no existe ${ id }`);
    }
}

const existeProductoPorId = async(id = '')=>{
    const existeProducto = Producto.findById( id );
    if( !existeProducto ){
        throw new Error (`El id no existe ${ id }`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones =[])=>{
    const incluida = colecciones.includes( coleccion );
    if(!incluida){
        throw new Error(`La coleccion ${ coleccion } no es permitida - ${ colecciones }`)
    }
    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProductoPorId,
    coleccionesPermitidas
}