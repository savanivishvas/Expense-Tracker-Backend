const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type: String,
    },
    email:{
        type: String,
        unique:true
    },
    password:{
        type: String,
        unique: true,
    },
    role:{
        type: String,
        default:"user",
    },
    profilepicURL:{
        type:String,
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
    status:{
        type: Boolean,
        default:true
    },
    otp:{
        type: Number,
    }
});

module.exports = mongoose.model("users",userSchema);

