const bcryptjs = require('bcryptjs')
const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario  = require('../models/usuario')

const login = async(req, res = response)=>{
    
    const { correo, password } = req.body;
    
    
    try {   
        //verifica email existe
        const usuario = await Usuario.findOne({ correo });
        
        if( !usuario ){
            return res.status(400).json({
                msg: ' Usuario / Password no son correctos - correo'
            })
        }
        
        //Usuario sigue activo

        if( !usuario.estado  ){
            return res.status(400).json({
                msg: ' Usuario / Password no son correctos - estado : false'
            })
        }

        //verificar la contraseña

        const conValida = bcryptjs.compareSync(password, usuario.password);
        if(!conValida){
            return res.status(400).json({
                msg: ' Usuario / Password no son correctos - password'
            })
        }
        //generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
    
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }
}

module.exports = {
    login
}