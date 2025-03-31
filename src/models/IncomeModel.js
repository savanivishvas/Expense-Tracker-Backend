const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    category:{
        type:String,
        required:true,
    },
    accountId:{
        type:Schema.Types.ObjectId,
        ref:"account"
    },
    status:{
        enum:["Pending","Received"],
        type: String,
        // required: true
    },
    amount:{
        type:Number,
        required :true
    },
    transactionDate	:{
        type:Date,
        required:true
    },
    type: {
        type: String,
        default: "income",  
        enum: ["income"]     
    },
    description:{
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"users"
    },
},
{
    timestamps:true
});

module.exports = mongoose.model("income",incomeSchema);