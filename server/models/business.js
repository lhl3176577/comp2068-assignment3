/*file name: Web_assignment3
Author Name: HongliangLiu(200255269)
website Name:https://hongliangliuassignment2.herokuapp.com.
file information please read readme file.
*/ 
var mongoose = require('mongoose');

// DEFINE THE BUSINESS CONTACT INFORMATION SCHEMA
var businessSchema = new mongoose.Schema( {
    ContactName: String,
    ContactNumber:String,
    EmailAddress: String
});

// MAKE THIS PUBLIC SO THE CONTROLLER CAN SEE IT
module.exports = mongoose.model('Business', businessSchema);


