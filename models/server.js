const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config')

const {resultado} = require('../database/database')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth        : '/api/auth',
            buscar      : '/api/buscar',
            categorias  : '/api/categorias',
            productos   : '/api/productos',
            usuarios    : '/api/usuarios',
            uploads     : '/api/uploads',
            usuario     : '/api/usuario',   
            nodo_central: '/api/nodo_central',   
            nodo_sensores: '/api/nodo_sensores',  
            planta: '/api/planta' 
        }
        
        // Conectar a base de datos
        this.conectarDB()
        //Middleware
        this.middlewares();
        //Rutas de mi aplicacion

        this.routes();

    }

    async conectarDB(){
        //await dbConnection();
        resultado();
    }
    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        // 'use' es la palabra clave para decir que es un middleware
        // Directorio publico
        this.app.use(express.static('public'));

        //Carga de archivos 
        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.usuario, require('../routes/usuario'));
        this.app.use(this.paths.nodo_central, require('../routes/nodo_central'));
        this.app.use(this.paths.nodo_sensores, require('../routes/nodo_sensores'));
        this.app.use(this.paths.planta, require('../routes/planta'));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}
module.exports = Server;