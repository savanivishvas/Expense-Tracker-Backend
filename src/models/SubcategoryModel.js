const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref:"category",
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"users",
    }
},{
    timestamps:true
})

module.exports = mongoose.model("subcategory",subcategorySchema);