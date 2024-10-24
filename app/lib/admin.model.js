const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    pin:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.models.admin || mongoose.model('admin', adminSchema);