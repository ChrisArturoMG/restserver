const bcryptjs = require('bcryptjs')
const { response, json } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSingin = async (req, res = response)=>{
    
    try {
        const { id_token } = req.body;  
        const {correo, nombre, img } = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ){
            //Crear usuario
            const data = {
                nombre,
                correo,
                password: ':p',
                img, 
                google: true
            };
            usuario = new Usuario( data );
            await usuario.save();
        }

        // si el usuario en db 

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,  
            token
        })
    } catch (e) {
        res.status(400).json({
            msg: 'Token de Google no valido'
        })
    }

    res.json({
        msg: 'Todo ok ',
        id_token
    })
}

module.exports = {
    login,
    googleSingin
}