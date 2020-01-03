const express = require('express');
const cors  = require('cors');
const helmet = require('helmet');
const moment = require('moment')
const adminRouter = require('./routes/auth.router')
const donationsRouter = require('./routes/donations.router')
const mailingListRouter = require('./routes/mailing-list.router')
const donationsProcssorRouter = require('./routes/donations.payments')
const authenticate = require('./auth/authenticate')
const  storyRouter = require('./routes/story.router')


/** Create the server
 *
 */
const server = express();


/** Middleware -
 * 
 * Logger function logs requests made to the server
 */
function logger(req,res,next){
    const url = req.url;
    const method = req.method;
   console.log(`There was a ${method} on ${url} @${moment().format('l')}`);
   next();
}

/** Middleware 
 * 
 */
server.use(logger);
server.use(cors());
server.use(helmet());
server.use(express.json());

/** Routers -
 * 
 */
server.use(express.static('public'))
 server.use('/donations',donationsRouter);
 server.use('/process',donationsProcssorRouter)
 server.use('/admin',adminRouter);
 server.use('/mailing_list',mailingListRouter);
 server.use('/story',storyRouter)
module.exports = server;