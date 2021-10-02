const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'project'
});

const resultado = async()=>{
    try {
        await mysqlConnection.connect(function(err){
            console.log("Succes");
        });
        
    } catch (e) {
        console.log(e);
        throw new Error('No se pudo iniciar la base de datos');
    }
}

module.exports = {
    resultado, mysqlConnection
};