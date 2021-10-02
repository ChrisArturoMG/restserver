const { Router, json } = require('express');
const { stringify } = require('uuid');
const { mysqlConnection} = require('../database/database')

const router = Router();

router.get('/login', (req, res) =>{
    //const { id } = req.params; 
    const {email, password} = req.body;
    mysqlConnection.query('SELECT * FROM usuario WHERE (email = ? and password = ?)', [email, password], (err, rows, fields) =>{
        if(rows.length!=0){
            res.status(200).json(rows[0]);
        }else{
            res.json({msg: "Invalid credentials"});
        }
        if(err){
            const {sqlMessage} = err;
            res.json({msg: sqlMessage})
        }
    });
});

router.get('/restaurar', (req, res) => {
    const { email } = req.body;
    mysqlConnection.query('SELECT * FROM usuario WHERE email = ?',[email] ,(err, rows, fiels)=>{
        //console.log(rows)
        if(rows.length!=0){
            res.status(200).json({
                msg: "Code send"
            });
        }else{
            res.status(200).json({
                msg: "Email not exists"
            });
        }
    });
});

router.post('/register', (req, res) =>{
    const {idUsuario, email, username, password,url, registerDate} = req.body;
    mysqlConnection.query('INSERT INTO usuario (idUsuario,email,username,password,url,registerDate) VALUES (?,?,?,?,?,?)',[idUsuario, email, username, password,url, registerDate] ,(err, rows, fields)=>{
        if(!err){
            res.status(201).json({
                msg: "User created"
            })
        }else{
            const {sqlMessage} = err;
            res.json({msg: sqlMessage})
        }
    })
});

router.put('/edit', (req, res) =>{
    const {idUsuario, email, username, password} = req.body;
    mysqlConnection.query('UPDATE usuario SET email = ?, username = ?, password=? WHERE idUsuario=?', [email, username, password,idUsuario],(err, rows, fields)=>{
        if(!err){
            res.status(201).json({
                msg: "User chenged"
            })
        }else{
            const {sqlMessage} = err;
            res.json({msg: sqlMessage})
        }
    })
});




module.exports = router;