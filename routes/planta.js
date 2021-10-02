const { Router, json } = require('express');
const { stringify } = require('uuid');
const { mysqlConnection} = require('../database/database')

const router = Router();


router.get('/', (req, res) =>{
    const {idPlant} = req.body;
    mysqlConnection.query('SELECT * FROM planta WHERE idPlant = ?', [idPlant], (err, rows, fields) =>{
        if(rows.length!=0){
            res.status(200).json(rows[0]);
        }else{
            res.json({err});
        }
    });
});
router.post('/register', (req, res) =>{
    const {idPlant, scientificName, alias } = req.body;

    mysqlConnection.query('INSERT INTO planta (idPlant, scientificName, alias) VALUES (?,?,?)',[idPlant, scientificName, alias] ,(err, rows, fields)=>{
        if(!err){
            res.status(201).json({
                msg: "Plant created"
            })
        }else{
            res.json({msg: err})
        }
    })
});


module.exports = router;