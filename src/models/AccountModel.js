const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    title:{
        type:String,
    },
    amount:{
        type:Number,
    },
    description:{
        type:String,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"users",
        required:true,
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("account",accountSchema);