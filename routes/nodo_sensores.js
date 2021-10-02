const { Router, json } = require('express');
const { stringify } = require('uuid');
const { mysqlConnection} = require('../database/database')

const router = Router();


router.get('/node', (req, res) =>{
    const {idBluetoothNS} = req.body;
    mysqlConnection.query('SELECT * FROM nodo_sensores WHERE idBluetoothNS = ?', [idBluetoothNS], (err, rows, fields) =>{
        if(rows.length!=0){
            res.status(200).json(rows[0]);
        }else{
            res.json({err});
        }
    });
});
router.post('/register', (req, res) =>{
    const {idBluetoothNS, idPlant,url,idBluetoothNC, registerDate } = req.body;
    mysqlConnection.query('INSERT INTO nodo_sensores (idBluetoothNS, idPlant,url,idBluetoothNC, registerDate ) VALUES (?,?,?,?,?,?)',[idBluetoothNS, idPlant,url,idBluetoothNC, registerDate] ,(err, rows, fields)=>{
        if(!err){
            res.status(201).json({
                msg: "Node created"
            })
        }else{
            res.json({msg: err})
        }
    })
});

router.get('/nodes', (req, res) =>{
    const {idBluetoothNC} = req.body;
    mysqlConnection.query('SELECT * FROM nodo_sensores WHERE idBluetoothNC = ?', [idBluetoothNC], (err, rows, fields) =>{
        if(rows.length!=0){
            res.status(200).json(rows);
        }else{
            res.status(200).json({
                msg: "Not nodes"
            })
        }
        if(err){
            res.json({err});
        }       
    });
});


module.exports = router;