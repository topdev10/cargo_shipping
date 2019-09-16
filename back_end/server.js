const express = require('express')
      ,app = express()
      ,dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
mongoose.Promise = global.Promise;
const cors = require('cors');

// Define the dotenv package
dotenv.config();

mongoose.connect(process.env.DB, { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', function(){
    console.log("Connected to MongoDB, ", process.env.DB);

    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(flash());
    // make uploads folder public

    app.use(session({
        cookie: { maxAge: 60000 },
        secret: '321654987',
        saveUninitialized: false,
        resave: false,
        saveUninitialized: true,
    }));

    app.use(function(req, res, next){
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
        
    //passport Config
    require('./config/config')(passport);

    //Passport Middleware
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/uploads', express.static('uploads'));
    
    app.get('*', function(req, res, next){
        res.locals.user = req.user||null;
        next();
    });

    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    app.use('/auth', require('./routes/user'));
    app.use('/api', require('./routes/api'));
    
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        return res.status(404).send("Unknown End Point");
    });

    app.listen(process.env.PORT||8000, () => {
        console.log('Server started listening on port', process.env.PORT|8000, '!')
    });
});

//check for DB Errors
db.on('error', function(err){
    console.log("what's wrong???",err);
});

module.exports = app;