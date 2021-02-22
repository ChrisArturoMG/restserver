const { response, request } = require('express')
const jwt  = require('jsonwebtoken');
const usuario = require('../models/usuario');

const Usuario = require('../models/usuario')

const validarJWT = async(req = request, res = response, next)=>{
    
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: ' No hay token en la peticion'
        })
    }

    try {
        
        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid); 
        req.usuario = usuario;

        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe DB'
            })
        }

        //Verificar si el uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - Usuario estado :false'
            })
        }


        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}   

module.exports = {
    validarJWT
}