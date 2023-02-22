const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
    "Title": {
        type: String,
        required: true,
        minlength: 1,
        trim: true 
    }
})

const Entity = mongoose.model('Entity', entitySchema);

module.exports = {
    Entity
}