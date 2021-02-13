const { response, request } = require('express')

const usuariosGet = (req = request, res=response) => {
    
    const {q, nombre='no name',apikey, page=1, limit } = req.query;
    
    res.json({
        ok: true,
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
        page, 
        limit 

    })
}

const usuariosPost = (req, res=response) => {
    
    const body = req.body;
    
    res.json({
        ok: true,
        msg: 'post API - Controlador',
        body
    })
}

const usuariosPut = (req, res=response) => {
    const { id } = req.params.id;
    
    res.json({
        msg: 'put API ',
        id
    })
}

const usuariosPatch = (req, res=response) => {
    res.json({
        ok: true,
        msg: 'patch API - Controlador'
    })
}

const usuariosDelete = (req, res=response) => {
    res.json({
        ok: true,
        msg: 'delete API - Controlador'
    })
}


module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut, 
    usuariosPatch, 
    usuariosDelete
}