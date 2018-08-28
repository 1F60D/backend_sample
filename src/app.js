const express = require('express'); 
const bodyParser = require('body-parser'); 
const morgan = require('morgan'); 
const path = require('path'); 
const fileStreamRotator = require('file-stream-rotator'); 
const methodOverride = require('method-override'); 
const session = require('express-session'); 
const util = require('util'); 
const cookieParser = require('cookie-parser'); 
const routes = require('./routes');

const app = express(); 
const PROCESS_PID = process.pid; 
const LISTEN_PORT = process.env.PORT ? process.env.PORT : 3000; 


/** EXPRESS SERVER GLOBAL VARIABLES */
global.SERVER_ENV = app.get('env').trim() || 'development'; 
global.SERVER_CONFIG = require(`./config/${SERVER_ENV}`).default; 


/** LOGGER SETTING */
if(SERVER_ENV === 'production') {

    /** Create Log Files */
    const LogFile           = util.format('%s/%DATE%-%d-app.log', path.join(__dirname, '..', 'logs'), PROCESS_PID); 
    const LogStream         = fileStreamRotator.getStream({
                                date_format: 'YYYY.MM.DD', 
                                filename: LogFile, 
                                frequency: 'daily', 
                                verbose: true 
                            });

    app.use(morgan('common', {
        stream: LogStream
    }));   

} else { 
    app.use(morgan('dev')); 
}

/** ENABLE MIDDLEWARE */
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(methodOverride()); 

/** API ROUTES */
app.use('/', routes); 

// Setting XSS Rules 
app.use((req, res, next) => {
    const origin = req.headers.origin; 
    const allowOrigin = SERVER_CONFIG.accessControl.allowOrigin; 

    if(allowOrigin.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin); 
    }

    res.setHeader('Access-Control-Allow-Methods', SERVER_CONFIG.accessControl.allowMethods); 
    res.setHeader('Access-Control-Allow-Headers', SERVER_CONFIG.accessControl.allowHeaders); 
    next(); 
})

// Catch 404 and forward to error handler 
app.use((req, res, next) => {
    const err = new Error('404 NOT FOUND ERROR'); 
    err.status = 404; 
    next(err); 
}); 

// Internal Server Error handler(50x Error) 
app.use((err, req, res, next) => {
    
    // Set locals, only providing error in development 
    console.log('\n/************** ERROR STACK *****************/');
    console.log(err.stack);
    console.log('/************** ERROR STACK *****************/\n');
    
    const status = err.status || 500; 
    const message = err.message || {}; 

    if(req.xhr){
        res.status(status).json(message); 
    } else {
        res.locals.status = status; 
        res.locals.message = message; 
        res.status(status).json('error'); 
    }
}); 

// LISTENING BACK-END SERVER 
app.listen(LISTEN_PORT, () => {
    console.log('\n/************** SERVER_START_UP *****************/');
    console.log('SERVER_ENV : ' + SERVER_ENV);
    console.log('PID : #%d / PORT : #%d', PROCESS_PID, LISTEN_PORT);
    console.log('/************** SERVER_START_UP *****************/\n');
}); 


module.exports = app; 