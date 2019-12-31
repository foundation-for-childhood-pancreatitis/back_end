// check to see if user is logged in
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
   
    if (token) {
        //check if token is valid
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                //Invalid token
                res.status(401).json({message:"Invalid Token!!!!! Please Log In Again"});
            }else{
                // Valid token
                req.user = decodedToken.username ;
       
                //Finish with this middleware onto the next
                
            
                next()
            }
        });
    } else {
        res.status(400).json({message: "Please Login"});
    }
};