const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    category:{
        type:String,
        required:true
    },
    // status:{
    //     enum:["Completed","NotCompleted"],
    //     type: String,
    //     // required: true
    // },
    amount:{
        type:Number,
        required:true
    },
    transactionDate	:{
        type:Date,
        required:true
    },
    type: {
        type: String,
        default: "expense",  
        enum: ["expense"]     
    },
    description:{
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"users"
    },
    // categoryId:{
    //     type: Schema.Types.ObjectId,
    //     ref:"category"
    // },
    // subcategoryId:{
    //     type: Schema.Types.ObjectId,
    //     ref:"subcategory"
    // },
    // vendorId:{
    //     type: Schema.Types.ObjectId,
    //     ref:"vendor"
    // },
    // accountId:{
    //     type: Schema.Types.ObjectId,
    //     ref:"account"
    // },
    // Balance :{    amount = expense - income

    // }
},{
    timestamps:true
});

module.exports = mongoose.model("expense",expenseSchema);