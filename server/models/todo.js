/*file name: Web_assignment3
Author Name: HongliangLiu(200255269)
website Name:https://hongliangliuassignment2.herokuapp.com.
file information please read readme file.
*/ 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    name: String,
    completed: Boolean,
    username: String,
    note: String,
    updated_at: {type:Date, default: Date.now}
}, {
    collection: 'todos'
});

module.exports = mongoose.model('Todo', TodoSchema);