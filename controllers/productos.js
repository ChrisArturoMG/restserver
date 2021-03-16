const { response } = require('express')
const { report } = require('../routes/productos')
const { Producto, Categoria } = require('../models');
const categoria = require('../models/categoria');


// Obtener categorias - Paginado - total de categorias - populate

const obtenerProductos = async(req, res = response ) => {

    const { limite = 5, desde = 0} = req.query;
    const query = {estado : true}

    const [ total, productos ] = await Promise.all ([
        Producto.countDocuments( query ),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number( desde ))
        .limit(Number( limite ))
    ])

    res.json({
        productos,
        total
    })
}

// Obtener categoria- - populate { objeto de la categoria }
const obtenerProducto = async(req, res = response ) => {
    const { id } = req.params;
    const  producto  = await Producto.findById( id )
                            .populate('usuario','nombre')
                            .populate('categoria','nombre');
     res.json({
        producto
     })
}

const crearProducto = async(req, res = response) =>{

    const { estado, usuario,...body} = req.body;
    nombre = body.nombre.toUpperCase();

    const productoDB = await  Producto.findOne({ nombre });
    const categoriaDB =  await Categoria.findOne({ nombre: categoria });
    
    if( productoDB ){
        res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })
    }
    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id
    }

    const producto = new Producto( data );
    await producto.save();
    res.status(201).json(producto);

}

//actualizat categoria solo recibe el nombre
const actualizarProducto = async(req, res = response)=>{
    const { id } = req.params;
    const {estado,usuario,...data} = req.body;
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    
    data.usuario =req.usuario._id;
    const nueva = await Producto.findByIdAndUpdate(id, data, {new : true}); 
    res.json({
        nueva
    })
}

//borrar categoria  - estado : false
const borrarProducto = async ( req, res = response) =>{
    const { id }= req.params;
    const usuario = await Producto.findByIdAndUpdate( id, {estado : false }, {new: true} );  
    res.json({
        usuario
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}