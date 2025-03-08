const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"users",
    }
},
{
    timestamps:true,
})

module.exports = mongoose.model("category",categorySchema);