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

// Define the dotenv package
dotenv.config();


router.post('/login', [
    check('password', "Invalid Length").isLength({min: 6})
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else if(Auth.authenticate(req))
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
                            res.status(200).send({email: user.email, username: user.username}); //success response
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
    } else if(Auth.authenticate(req))
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
            html: `<h1>Here is your verification Code! </h1> <p><b>${m_code}</b></p><br/><h1>Or you can just click this link to activate your account</h1><a>http://localhost:8080/auth/${req.body.username}/${m_token}</a>`
        };

        transport.sendMail(message, function(err, info) {
            if (err) {
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

router.post('/addprofile', [
    check('email').isEmail(),
    check('firstname', "Firstname is required").not().isEmpty(),
    check('lastname', "Lastname is required").not().isEmpty(),
    check('phonenumber', "You have to input valid phone number").not().isMobilePhone()
], function(req, res){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({ errors: errors.array() });
    } else {    //if(Auth.authenticate(req))
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