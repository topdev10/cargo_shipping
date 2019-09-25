const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const Profile = require('../model/profile');
const Auth = require('../controller/auth');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
var http = require('https');
var querystring = require('querystring');
const multer = require('multer');
var Pusher = require('pusher');

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads/');
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else cb(null, false);
};

const upload = multer({storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Define the dotenv package
dotenv.config();

/**
 *  Implement Notification Feature with Pusher
 **/

// Declare Main Chanel for Notificaiton
var channels_client = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true
});

//Send Notification Function
const sendNotification = (message, eventType) => {
    channels_client.trigger(process.env.PUSHER_CHANNEL|"tpChannel", eventType, {
        "message": message 
    });
}

/**
 * Main Routing...
 */
router.post('/login', [
    check('password', "Invalid Length").isLength({min: 6})
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else if(Auth.auth(req))
        res.status(200).send();
    else {
        // Todo: Check if user exists in DB and save session
        let query;
        if(req.body.email)
            query = {
                email: req.body.email
            };
        else
            query = {
                username: req.body.username
            };
        User.findOne(query, function(err, user){
            if(err) res.status(500).send();         //Internal Server Error
            else if(!user) res.status(404).send();  //user not exists
            else {
                bcrypt.compare(req.body.password, user.password, function(err, isMatch){
                    if(err) res.status(401).send(); //invalid credential
                    if(isMatch){
                        if(user.status){
                            req.session.user = user;
                            res.status(200).send({email: user.email, username: user.username, token: user.token}); //success response
                        } else {
                            res.status(403).send(); //Not Active user
                        }                        
                    } else {
                        res.status(401).send(); //invalid credential(Unauthorized)
                    }
                });
            }
        })
    }
});

router.post('/token', [
    check('username', "Username is required and it's length have to be at least 3.").isLength({min: 3}),
    check('token', "Token is required and it's length have to be at least 20.").isLength({min: 20})
],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        console.log(errors.array(), req.body.token, req.body.username);
        User.findOne({username: req.body.username}, function(error, user){
            if(error) res.status(500).send();
            else if(!user) res.status(404).send();
            else {
                if(user.token === req.body.token){
                    if(user.status)
                        res.status(200).send(user);
                    else 
                        User.updateOne({username: req.body.username}, {status: true}, (e1, r1) => {
                            if(e1) res.status(500).send();
                            else if(r1.nModified > 0) res.status(200).send(user);
                            else res.status(426).send();
                        })
                }
            }
        });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send();
});

router.post('/verify', [
    check('code', "Code must be 6 Length Numbers.").isNumeric().isLength({min: 6, max:6}),
    check('email', "Invalid Email").isEmail()
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        User.findOne({email: req.body.email}, function(err, user){
            if(err) res.status(500).send();         //Internal Server Error
            else if(!user) res.status(404).send();  //user not exists
            else {
                if(user.code == req.body.code){
                    User.updateOne({email: req.body.email}, {status: true}, (e1, r1) => {
                        if(e1) res.status(500).send();         //Internal Server Error
                        else if(r1.nModified>0) res.status(200).send();
                        else res.status(426).send();           //update failed (426: failed previous request)
                    });
                } else res.status(400).send();                  //Bad Request
            }
        });
    }
});

router.post('/forgotPassword', [
    check('email', "You have to input your email or user name you used while on signup. And the length have to be at least 3.").isString().isLength({min: 3}),
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        let reqbody;
        if(req.body.email.includes('@'))
            reqbody = { email: req.body.email };
        else reqbody = { username: req.body.email };
        User.findOne(reqbody, function(error, user){
            if(error) res.status(500).send();         //Internal Server Error
            else if(!user) res.status(404).send();  //user not exists
            else {
                // TODO: generate a new code and save it to db and send response to front-end
                let m_code = '';
                for(var i =0; i < 6; i ++){
                    m_code += (Math.floor(Math.random()*10)).toString();
                }

                console.log("Generated Verification Code is ", m_code);
                User.updateOne(reqbody, {code: m_code}, (e1, r1) => {
                    if(e1) res.status(500).send();         //Internal Server Error
                    else if(r1.nModified>0){
                        let transport = nodemailer.createTransport({
                            service: 'gmail',
                            tls: { rejectUnauthorized: false },
                            auth: {
                                user: process.env.SERVER_EMAIL,
                                pass: process.env.EMAIL_PASSWORD
                            }
                        });
                        nodemailer.sendMail = true;
        
                        const message = {
                            from: process.env.SERVER_EMAIL, // Sender address
                            to: user.email,         // List of recipients
                            subject: 'Please Verify your Freight Genius Account.', // Subject line
                            text: `Your Verification Code is ${m_code}`, // Plain text body
                        };

                        transport.sendMail(message, function(err, info) {
                            if (err) {
                                res.status(500).send();
                            } else {
                                // TODO: Save User info to DB
                                res.status(200).send(); //success response
                            }
                        });
                    }
                })
            }
        });
    }
});

router.post('/resetPassword',[
    check('password').isLength({min: 6}).custom((value,{req, loc, path}) => {
        if (value !== req.body.cpassword) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }),
    check('cpassword', "You have to input Confirm password").not().isEmpty(),
    check('code', "Code must be 6 Length Numbers.").isNumeric().isLength({min: 6, max:6}),
], function(req, res) {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({ errors: errors.array() });       //Return Validation Errors
    } else if(req.body.password != req.body.cpassword){
        res.status(422).json({ errors: errors.array() });
    } else {
        let reqbody;
        if(req.body.email.includes('@'))
            reqbody = { email: req.body.email };
        else reqbody = { username: req.body.email };
        User.findOne(reqbody, (error, user) => {
            if(error) res.status(500).send();
            else if(!user) res.status(404).send();  //user not exists
            else {
                // Encrypt Password & Save to DB
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(req.body.password, salt, function(err, hash){
                        if(err){
                            res.status(500).send();
                        }

                        User.updateOne(reqbody, {password: hash}, (e1, r1) => {
                            if(e1) res.status(500).send();
                            else if(r1.nModified>0) res.status(200).send();
                            else res.status(426).send();
                        });
                    });
                });
            }
        })
    }
});

router.post('/signup', [
    check('email').isEmail(),
    check('username').isLength({min: 3}),
    check('password').isLength({min: 6}).custom((value,{req, loc, path}) => {
        if (value !== req.body.confirm_password) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }),
    check('confirm_password', "You have to input Confirm password").not().isEmpty(),
], function(req, res){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({ errors: errors.array() });       //Return Validation Errors
    } else if(req.body.password != req.body.confirm_password){
        res.status(422).json({ errors: errors.array() });
    } else if(Auth.auth(req))
        res.status(409).send();     //conflict
    else {
        let m_code = '';
        for(var i =0; i < 6; i ++){
            m_code += (Math.floor(Math.random()*10)).toString();
        }
        const m_token = crypto.randomBytes(48).toString("hex");
        console.log("Generated Verification Code is ", m_code, "token", m_token);
        // TODO: Send Email with Verification code to User email and save User data to DB
        let transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,//true
            port: 25,//465
            tls: { rejectUnauthorized: false },
            auth: {
                user: process.env.SERVER_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        nodemailer.sendMail = true;

        const message = {
            from: process.env.SERVER_EMAIL, // Sender address
            to: req.body.email,         // List of recipients
            subject: 'Please Verify your Freight Genius Account.', // Subject line
            // text: `Your Verification Code is ${m_code}`, // Plain text body
            html: `<h1>Here is your verification Code! </h1> <p><b>${m_code}</b></p><br/><h1>Or you can just click this link to activate your account</h1><a>${process.env.FRONT_URL_DEPLOY}/auth/${req.body.username}/${m_token}</a>`
        };

        transport.sendMail(message, function(err, info) {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                // TODO: Save User info to DB
                let user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    code: parseInt(m_code, 10),
                    status: false,
                    token: m_token,
                });
            
                // Encrypt Password & Save to DB
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(user.password, salt, function(err, hash){
                        if(err){
                            res.status(500).send();
                        }
                        user.password = hash;
            
                        User.find({email: user.email})
                        .then(result => {
                            if(result.length > 0){
                                res.status(409).send();
                            } else {
                                user.save((e1, r1) => {
                                    if(e1) res.status(500).send();
                                    else res.status(200).send(); //success response
                                })
                            }
                        })
                        .catch(err => {
                            res.status(409).send();
                        })
                    });
                });
            }
        });
    }
});

router.post('/getProfile', [
    check('username').not().isEmpty(),
    check('email').isEmail(),
] , function(req, res) {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({ errors: errors.array() });
    } else {
        Profile.findOne({email: req.body.email}, (error, profile)=>{
            if(error) res.status(500).send();
            else if(profile){   // if profile exists send data to requested side
                res.status(200).send(profile);
            } else if(!profile){
                res.status(200).send(null);
            }
        });
    }
});

function getLinkedInData(access_token,callback){
    var options = {
        host: 'api.linkedin.com',
        path: '/v2/emailAddress?q=members&projection=(elements*(handle~))',
        // path: '/v2/me?projection=(id,firstName,lastName)',
        // path: '/v2/people/~:(id,first-name,last-name,headline,picture-url,location,industry,current-share,num-connections,summary,specialties,positions)?format=json',
        protocol: 'https:',
        method: 'GET',
        headers: {
            "Authorization": 'Bearer ' + access_token
        }
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            console.log('PROFILE DATA  ', chunk);
            data += chunk;
        });
        res.on('end', function () {
            callback(JSON.parse(data));
            console.log('No more data in response.');
        });
        req.on('error', function (e) {
            console.log("problem with request: " + e.message);
        });
    });
    req.end();
}

function getLinkedInName(access_token,callback){
    var options = {
        host: 'api.linkedin.com',
        // path: '/v2/emailAddress?q=members&projection=(elements*(handle~))',
        path: '/v2/me',
        // path: '/v2/people/~:(id,first-name,last-name,headline,picture-url,location,industry,current-share,num-connections,summary,specialties,positions)?format=json',
        protocol: 'https:',
        method: 'GET',
        headers: {
            "Authorization": 'Bearer ' + access_token
        }
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            console.log('PROFILE DATA  ', chunk);
            data += chunk;
        });
        res.on('end', function () {
            callback(JSON.parse(data));
            console.log('No more data in response.');
        });
        req.on('error', function (e) {
            console.log("problem with request: " + e.message);
        });
    });
    req.end();
}

function handshake(code, ores) {

    //set all required post parameters
    var data = querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URL_LOCAL,//should match as in Linkedin application setup
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_SECRET_KEY// the secret
    });

    var options = {
        host: 'www.linkedin.com',
        path: '/oauth/v2/accessToken',
        protocol: 'https:',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var req = http.request(options, function (res) {
         var data = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;

        });
        res.on('end', function () {
            //once the access token is received store in DB
            // insertTodb(JSON.parse(data), function (id) {
            //     //need to find better way and proper authetication for the user
            //     ores.redirect('http://localhost:3000/dashboard/' + id);
            // });
            console.log(JSON.parse(data));
            if(JSON.parse(data).access_token)
                getLinkedInData(JSON.parse(data).access_token, (profile) => {
                    if(profile.elements)
                    {
                        const emailAddr = profile.elements[0]['handle~'].emailAddress;
                        getLinkedInName(JSON.parse(data).access_token, (m_profile) => {
                            console.log(emailAddr, m_profile);
                            console.log(m_profile.localizedFirstName);
                            if(m_profile.localizedFirstName)
                                ores.redirect(`${process.env.FRONT_URL_DEPLOY}/linkedIn/${emailAddr}/${m_profile.localizedFirstName}`)
                        })
                    }
                })
            else ores.redirect(`${process.env.FRONT_URL_DEPLOY}/login`)
        });
        req.on('error', function (e) {
            console.log("problem with request: " + e.message);
        });
    });
    req.write(data);
    req.end();
}

router.get('/linkedin', (req, res) => {
    console.log("auth route - Request object received from Linkedin", req.query);
    //TODO: validate state here
    var error = req.query.error;
    var error_description = req.query.error_description;
    var state = req.query.state;
    var code = req.query.code;
    if (error) {
        next(new Error(error));
    }

    //once the code is received handshake back with linkedin to send over the secret key
    handshake(req.query.code, res);
});

router.post('/uploadProfileImage', upload.single('profileAvatar'), (req, res, next) => {
    // console.log(req.file);
    Profile.findOneAndUpdate({email: req.body.email}, {img: req.file.path}, (err, result) => {
        if(err) res.status(426).send();
        else res.status(200).send();
    });
});

router.post('/addprofile', [
    check('email').isEmail(),
    check('firstname', "Firstname is required").not().isEmpty(),
    check('lastname', "Lastname is required").not().isEmpty(),
    check('phonenumber', "You have to input valid phone number").not().isMobilePhone()
], function(req, res){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({ errors: errors.array() });
    } else {    //if(Auth.auth(req))
        // TODO: Add profile into to DB based on email address
        Profile.findOne({email: req.body.email}, (error, profile) => {      //check if profile already exists
            // TODO: if profile exists Update current profile, otherwise add new profile to DB
            if(error) res.status(500).send();
            else if(profile){   // if profile exists update current profile with new data
                Profile.update({email: req.body.email}, {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phonenumber: req.body.phonenumber,
                    address: req.body.address
                }, (e2, r2) => {
                    if(e2) res.status(500).send();
                    else if(r2.nModified>0) res.status(200).send();   //profile successfully updated
                    else res.status(426).send();                    //update failed (426: failed previous request)
                })
            } else {            // if profile don't exists add new profile
                let newProfile = new Profile({
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phonenumber: req.body.phonenumber,
                    address: req.body.address
                });
                // Save new Profile to DB
                newProfile.save((e1, r1) => {
                    if(e1) res.status(500).send();
                    else res.status(200).send();    //Send Success Message
                })
            }
        })
    }
    // else {
    //     res.status(401).send(); //invalid credential(Unauthorized)
    // }
})

module.exports = router;
