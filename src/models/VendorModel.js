const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSchema = new Schema({

    title:{
        type:String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"users"
    }
})

module.exports = mongoose.model("vendor",vendorSchema);