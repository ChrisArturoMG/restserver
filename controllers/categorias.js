const { response } = require('express')
const { report } = require('../routes/categorias')
const { Categoria } = require('../models')


// Obtener categorias - Paginado - total de categorias - populate

const obtenerCategorias = async(req, res = response ) => {

    const { limite = 5, desde = 0} = req.query;
    const query = {estado : true}

    const [ total, categorias ] = await Promise.all ([
        Categoria.countDocuments( query ),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number( desde ))
        .limit(Number( limite ))
    ])

    res.json({
        categorias,
        total
    })
}

// Obtener categoria- - populate { objeto de la categoria }
const obtenerCategoria = async(req, res = response ) => {
    const { id } = req.params;
    const categoria =await Categoria.findById( id ).populate('usuario','nombre');
     res.json({
         categoria
     })
}

const crearCategoria = async(req, res = response) =>{

    const nombre = req.body.nombre.toUpperCase();
    
    const categoriaDB = await  Categoria.findOne({ nombre });

    if( categoriaDB ){
        res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    // Generar la data a guardar
    console.log( req.usuario)
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    //Guardar en DB
    await categoria.save();

    res.status(201).json( categoria );
}

//actualizat categoria solo recibe el nombre
const actualizarCategoria = async(req, res = response)=>{
    const { id } = req.params;
    const {estado,usuario,...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario =req.usuario._id;

    const nueva = await Categoria.findByIdAndUpdate(id, data, {new : true}); 
    res.json({
        nueva
    })
}

//borrar categoria  - estado : false
const borrarCategoria = async ( req, res = response) =>{
    const { id }= req.params;
    const usuario = await Categoria.findByIdAndUpdate( id, {estado : false }, {new: true} );  
    res.json({
        usuario
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}