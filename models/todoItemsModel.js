const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
    item:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model('todo', TodoItemSchema)