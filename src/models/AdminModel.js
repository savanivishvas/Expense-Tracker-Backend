const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name:{
        type: String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
})

module.exports = mongoose.model("admins",adminSchema);