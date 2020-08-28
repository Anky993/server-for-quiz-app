const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const { MongoClient, ObjectID } = require('mongodb');
const config = require('../config/config')
const monogconfig = config.DATABASE_CONFIG.url;
const database = config.DATABASE_CONFIG.database
let connection;
var BCRYPT_SALT_ROUNDS = 12;
MongoClient.connect(monogconfig,{ useUnifiedTopology: true })
    .then(db => {
        connection = db;
    })
    .catch(err => console.error(err.stack))

// ----- register email id and encypt the password ------ //

router.post('/register',(req,res,next)=>{
    console.log(req.body)
    // if(req.body.socialMedia === false){ // socialMedia is false, it will encrypt and save password
    connection.db(database).collection('mycol2').findOne({Email:req.body.Email},(err,result)=>{ // search in DB
        try{
            if(result){
                res.json(0) // if found response is 0
                return next();
            }
            else{ // if not find add data in DB
                req.body.Password= bcrypt.hashSync(req.body.Password, BCRYPT_SALT_ROUNDS); // encryption
                connection.db(database).collection('mycol2').insertOne(req.body, function (err, result) {
                    if(err) {throw err;
                    console.log(err)}
                    res.json(result);  // for confirmation response is result which is saved
                    console.log("posting");
                    console.log(result);
                })
            }
        }catch(err){
            throw err;
        }
    })
})

// ----- search in database -----//

router.post('/login',(req,res)=>{
    console.log(req.body);
    connection.db(database).collection('mycol2').findOne({Email:req.body.Email},(err,result)=>{
        try{
            if(result){
                if(bcrypt.compareSync(req.body.Password, result.Password)) { // compare req password and stored password
                    // return res.status(400).send({ message: "The password is invalid" });
                        return res.json(result);
                }else{
                    console.log("wrong password");
                    return res.json(0);
                }
            }else{
                console.log("Email not found!");
                res.json(0);                    
            }
        }catch(err){
            console.log(err)
            throw err;
        }
    })
})

router.get('/testtemp',(req,res)=>{
    res.json("testtempworks")
})
router.post('/testtemp',(req,res)=>{
    res.json("testtempworks")
})


module.exports = router