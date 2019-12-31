const express = require('express');
const cors  = require('cors');
const helmet = require('helmet');
const moment = require('moment')
const adminRouter = require('./routes/auth.router')
const donationsRouter = require('./routes/donations.router')
const mailingListRouter = require('./routes/mailing-list.router')
const authenticate = require('./auth/authenticate')
/**
 * Create the server
 */
const server = express();


/** Add Middleware
 * Logger function logs requests made to the server
 * @param {Request} Request Object
 * @returns {String} console logs the url and the request method
 * @returns {Function} returns next() ending the function
 */
function logger(req,res,next){
    const url = req.url;
    const method = req.method;
   console.log(`There was a ${method} on ${url} @${moment().format('l')}`);
   next();
}

server.use(logger);
server.use(cors());
server.use(helmet());
server.use(express.json());

/**
 * Add Routers
 */

 router.use('/donations',donationsRouter);
 router.use('/admin',adminRouter);
 router.use('/mailing_list',mailingListRouter);
 
module.exports = server;