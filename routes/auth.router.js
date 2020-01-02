const router = require('express').Router();
const db = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const moment = require('moment')



/**Register A New Admin
 * @post
 * @route admin/register
 * @param {String} name
 * @param {String} password
 * @param {String} email
 * @returns {Admin} admin object
 */
router.post('/register',(req,res) => {
    const admin = req.body
/**
 * creates a hash of the user password before adding 
 * it to the database
 */
    const hash = bcrypt.hashSync(admin.password,10);
    admin.password = hash

    db.addAdmin(admin)
    .then(saved  => {
        if(saved){res.status(201).json({message:`${saved.email} added @${moment().format('ll')}`,data:saved})}
           
        
        res.status(404).json({message:'Please check username and email'})})
    
    .catch(err =>{res.status(500),console.log(err)})
    
})

/**Login 
 * @post
 * @route admin/login
 * @param {String} email
 * @param {String} password
 * @returns {Token} authorization token
 */
router.post('/login' ,(req,res) => {
    const { email , password } = req.body;

    if(!email || !password){
        res.status(403).json({message:'Please enter login information'})
    }
    db.getByEmail(email )
  
      .then(admin => {
          if(admin && bcrypt.compareSync(password, admin.password)){
              // produce token
            const token = generateToken(admin);
              // return toke to the client

            res.status(200).json({
                message:`Welcome ${admin.email}`,
                token
            })
            
          }
          res.status(409).json({message:'User does not exist'})
      })
      .catch(error =>{res.status(500).json(error.message)})
})
function generateToken(admin) {
    const payload = {
      email: admin.email ,
      subject: admin.id,
      role: admin.role,
    };
    const options = {
      expiresIn: '8h',
    };
  
    return jwt.sign(payload, secrets.jwtSecret, options);
  }
  
  
  module.exports = router;
  