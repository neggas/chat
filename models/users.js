const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    pseudo:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})