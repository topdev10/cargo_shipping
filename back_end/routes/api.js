const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../model/user');
const Quote = require('../model/quote');
const Auth = require('../controller/auth');
const dotenv = require('dotenv');
var http = require('https');
const multer = require('multer');

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
* Functions to be used several times
**/
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Generate 
function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

// Get One Quote from DB by Id and user email
function getOneQuote(id, email, callback) {
    Quote.findOne({id, email}, (error, result) => callback(error, result));
}

// Get All quotes by email
function getAllQuotes(callback) {
    Quote.find((error, result) => {
        if(error) callback(error, null)
        else if(result.length > 0) callback(null, result)
        else callback(null, []);        
    })
}

// Get all quotes, shipments, billings, reports
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

// Add New Quote API
router.post('/addQuote', [
    check('email', "Invalid Email").isEmail(),
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        const token = req.headers.authorization?req.headers.authorization.substring(7):"";
        Auth.authenticate(req.body.email, token, (err, result) => {
            if(err) res.status(401).send(); //Unauthorized User or Token
            else if(result) {

                const idNum = ((100000 * Math.random())%99999).toString(10);
                const ID = "FREIGHT-" + pad(idNum, 5);
                const vidNum = ((1000009 * Math.random())%999999).toString(10);
                const VID = "FREIGHT-" + pad(vidNum, 6);
                const newQuote = new Quote({
                    id: ID,
                    email: req.body.email,
                    venderID: VID,
                    submittedBy: result.username,
                    shipmentName: req.body.shipmentName,
                    freightMethod: req.body.freightMethod,
                    shipmentType: req.body.shipmentType,
                    containerType: req.body.containerType,
                    incoterms: req.body.incoterms,
                    originAddress: req.body.originAddress,
                    originPort: req.body.originPort,
                    pickupReadyDate: req.body.pickupReadyDate,
                    delieverToLocation: req.body.delieverToLocation,
                    destAddress: req.body.destAddress,
                    destPort: req.body.destPort,
                    targetDeliveryDate: req.body.targetDeliveryDate,
                    cargoUnit: req.body.cargoUnit,
                    ispackageDetails: req.body.ispackageDetails,
                    cargoweight: req.body.cargoweight,
                    cargovolume: req.body.cargovolume,
                    description: req.body.description,
                    haveBattery: req.body.haveBattery,
                    haveHazardous: req.body.haveHazardous,
                    haveLiquids: req.body.haveLiquids,
                    haveNothing: req.body.haveNothing,
                    instruction: req.body.instruction,
                    status: 1,  // default value
                });

                newQuote.save((error, result) => {
                    console.log(error, result);
                    if(error) res.status(500).send(error.errmsg);   // previous request failed
                    else res.status(200).send(result);        // Success
                })
            } else res.status(401).send();
        });
    }
});

// Update Existing Quote Api
router.post('/updateQuote', [
    check('email', "Invalid Email").isEmail(),
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        const token = req.headers.authorization?req.headers.authorization.substring(7):"";
        Auth.authenticate(req.body.email, token, (err, result) => {
            if(err) res.status(401).send(); //Unauthorized User or Token
            else if(result) {
                console.log(req.body);
                Quote.updateOne({ id: req.body.id }, {
                    shipmentName: req.body.shipmentName,
                    freightMethod: req.body.freightMethod,
                    shipmentType: req.body.shipmentType,
                    containerType: req.body.containerType,
                    incoterms: req.body.incoterms,
                    originAddress: req.body.originAddress,
                    originPort: req.body.originPort,
                    pickupReadyDate: req.body.pickupReadyDate,
                    delieverToLocation: req.body.delieverToLocation,
                    destAddress: req.body.destAddress,
                    destPort: req.body.destPort,
                    targetDeliveryDate: req.body.targetDeliveryDate,
                    cargoUnit: req.body.cargoUnit,
                    ispackageDetails: req.body.ispackageDetails,
                    cargoweight: req.body.cargoweight,
                    cargovolume: req.body.cargovolume,
                    description: req.body.description,
                    haveBattery: req.body.haveBattery,
                    haveHazardous: req.body.haveHazardous,
                    haveLiquids: req.body.haveLiquids,
                    haveNothing: req.body.haveNothing,
                    instruction: req.body.instruction,
                }, (error, modified) => {
                    console.log(error, modified);
                    if(error) res.status(500).send();   // previous request failed
                    else if(modified.nModified>0) res.status(200).send();   //profile successfully updated
                    else res.status(426).send();                    //update failed (426: failed previous request)
                })
            } else res.status(401).send();
        });
    }
});

// Remove/Delete Existing Quote Api
router.post('/removeQuote', [
    check('email', "Invalid Email").isEmail(),
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        const token = req.headers.authorization?req.headers.authorization.substring(7):"";
        Auth.authenticate(req.body.email, token, (err, result) => {
            if(err) res.status(401).send(); //Unauthorized User or Token
            else if(result) {
                Quote.deleteOne({ id: req.body.id }, (error, result) => {
                    if(error) res.status(500).send();   // previous request failed
                    else if(result) res.status(200).send();   //profile successfully updated
                })
            } else res.status(401).send();
        });
    }
});

// Get one quote by id
router.post('/getQuote', [
    check('email', "Invalid Email").isEmail(),
    check('id', "id is required").not().isEmpty(),
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        const token = req.headers.authorization?req.headers.authorization.substring(7):"";
        Auth.authenticate(req.body.email, token, (err, result) => {
            if(err) res.status(401).send(); //Unauthorized User or Token
            else if(result) {
                getOneQuote( req.body.id, req.body.email, (e1, r1) => {
                    if(e1) res.status(500).send();
                    else res.status(200).send(r1);
                });
            } else res.status(401).send();
        });
    }
});

// Get All quotes from DB
router.post('/getAllQuotes', [
    check('email', "Invalid Email").isEmail(),
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        const token = req.headers.authorization?req.headers.authorization.substring(7):"";
        Auth.authenticate(req.body.email, token, (err, result) => {
            if(err) res.status(401).send(); //Unauthorized User or Token
            else if(result) {
                getAllQuotes((e1, r1) => {
                    if(e1) res.status(500).send();
                    else res.status(200).send(r1);
                });
            } else res.status(401).send();
        });
    }
});

// Upload New Quote Document
router.post('/uploadQD', upload.single('newQuotePDF'),[
    check('email', "Invalid Email").isEmail(),
    check('id', "ID is required").isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        const token = req.headers.authorization?req.headers.authorization.substring(7):"";
        Auth.authenticate(req.body.email, token, (err, result) => {
            if(err) res.status(401).send(); //Unauthorized User or Token
            else if(result) {
                // TODO: Save 
                Quote.findOneAndUpdate({id: req.body.id, email: req.body.email}, {document: req.file.path}, (e1, r1) => {
                    if(e1) res.status(500).send();
                    else if(r1.nModified > 0) res.status(200).send();
                    else res.status(426).send();
                })
            } else res.status(401).send();
        });
    }
});

// stripe payment part
router.post('/requestPayment', function(req, res) {
    // console.log(req.body);
    var amount = req.body.amount;
    var token_id = req.body.token_id; 
    var ship_id = req.body.ship_id; 
    var number = Number(amount.replace(/[^0-9.-]+/g,""));
    // console.log(amount);
    stripe.charges.create({
        amount: parseInt(number*100),
        currency: "usd",
        source: token_id, // obtained with Stripe.js
        description: "Charge for test"
      }, function(err, charge) {
        // asynchronously called
        if(err) {
            console.log(err.raw.message);
            res.send({error: err.raw.message, ship_id: null});
        } else {
            res.status(200).send({error: null, ship_id});
        }
    });
});

module.exports = router;