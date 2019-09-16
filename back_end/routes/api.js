const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../model/user');
const Auth = require('../controller/auth');
const dotenv = require('dotenv');
var http = require('https');

// Define the dotenv package
dotenv.config();

router.post('/getAll', [
    check('email', "Invalid Email").isEmail(),
    check('token', "Token is required").not().isEmpty(),
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        // TODO: Get All shipments, quotes, billings, reports and return to front-end
    }
});

module.exports = router;