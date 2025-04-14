const ExpenseModel = require("../models/ExpenseModel");
const expenseModel = require("../models/ExpenseModel");

// create expense api
const addExpense = async (req,res) => {
    try {

        const createExpense = await expenseModel.create(req.body);
        res.status(201).json({
            message:"add expense successfully...",
            data:createExpense
        });
        
    } catch (err) {
        res.status(500).json({
            message:"Error...",
            data:err
        })
    }
}

// read all expense api
const getAllExpense = async (req , res) => {
    try {

        const allExpense = await expenseModel.find().populate("userId").limit(20);
        res.status(200).json({
            message:"All Expenses ....",
            data:allExpense
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ...",
            data:err
        })
    }
}

// delete expense api
const deleteExpenceById = async (req , res) => {
    try {

        const delteExpence = await expenseModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
           message:"delete expense successfully...",
           data:delteExpence
        })
        
    } catch (err) {
        res.status(500).json({
            message:"delete expense successfully ....",
            data:err
        })
    }
}

// updateexpense api
const updateExpense = async (req,res) => {

    try {

        const updateexpense = await expenseModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        )

        res.status(200).json({
            message:"update Income successfully .....",
            data:updateexpense
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// get expenseby userid api
const getExpenseByUserId = async (req,res) =>{
    try {

        const foundExpence = await expenseModel.find({ userId : req.params.userId});
        console.log(foundExpence);
        
        res.status(200).json({
            message:"found Expense by userid successfully",
            data:foundExpence
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

// last 30 days expense

const last30daysexpense = async (req,res) => {
    try {

        const expense =  await ExpenseModel.find().sort({ transationData : -1}).limit(10);
        res.status(200).json({
            message:"last 30  days transactions",
            data:expense
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}


module.exports = {
    addExpense,
    getAllExpense,
    updateExpense,
    deleteExpenceById,
    getExpenseByUserId,
    last30daysexpense
};