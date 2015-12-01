/*file name: Web_assignment3
Author Name: HongliangLiu(200255269)
website Name:https://hongliangliuassignment2.herokuapp.com.
file information please read readme file.
*/ 
var express = require('express');
var passport = require('passport');
var router = express.Router();

//db references 
var mongoose = require('mongoose');
var Business = require('../models/business.js');
var User = require('../models/user');

function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}


// GET - show main business page
router.get('/',requireAuth, function (req, res, next) {

    // use the business model to query the business collection 
    Business.find(function (err, businesses) {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('businesses/index', {
                title: 'Business Contact List',
                businesses:businesses,
                displayName: req.user ? req.user.displayName : ''
            });
        }
       

    }).sort( { ContactName: 1 } )
  
});
// GET add page - show the blank form
router.get('/add',requireAuth, function(req, res, next) {
    res.render('businesses/add', {
        title: 'Add a New Business Contact List',
        displayName: req.user ? req.user.displayName : ''
    });
});

// POST add page - save the new business contact member.
router.post('/add',requireAuth, function(req, res, next) {

    Business.create( {
         ContactName:req.body.ContactName,
         ContactNumber:req.body.ContactNumber,
         EmailAddress: req.body.EmailAddress
    }, function(err, Business) {
        // did we get back an error or valid Business contact List object??
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesses');
        }
    });
});


// GET edit page - show the current business contact information in the form
router.get('/:id',requireAuth, function(req, res, next) {

    var id = req.params.id;

    Business.findById(id, function(err, businesses) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('businesses/edit', {
                title: 'Business Contact List Information Details',
                businesses:businesses,
                   displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});
/*
// POST edit page - update the selected Business Contact List
router.post('/:id',requireAuth, function(req, res, next) {

    // grab the id from the url parameter
    var id = req.params.id;

    // create and populate an  business contact object
    var Businesses = new Business( {
        _id: id,
         ContactName:req.body.ContactName,
         ContactNumber:req.body.ContactNumber,
         EmailAddress: req.body.EmailAddress
    });

    // run the update using mongoose and our model
    Business.update( { _id: id },Businesses, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesses');
        }
    });
});
*/
/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var business = new Business(req.body);
  //  business.password = business.generateHash(business.password);
    business._id = id;
  //  business.updated = Date.now();
    
    // use mongoose to do the update
    Business.update({ _id: id }, business, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesses');
        }
    });
});






// GET delete business contact list
router.get('/delete/:id', requireAuth, function(req, res, next) {

    // get the id from the url
    var id = req.params.id;

    // use the model and delete this record
    Business.remove({ _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesses');
        }
    });
});



// make this public
module.exports = router;
