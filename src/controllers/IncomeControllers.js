const incomeModel = require("../models/IncomeModel");

// addincome api
const addIncome = async (req,res) => {
    try {

        const createIncome = await incomeModel.create(req.body);
        res.status(201).json({
            message:"add income succssfully...",
            data:createIncome
        })
        
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

// get All Income Api
const getAllIncome = async (req,res) => {
    try {

        const allincome = await incomeModel.find().populate("userId").limit(20);
        res.status(200).json({
            message:"All Incomes ....",
            data:allincome
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

// delete income api
const deleteIncome = async (req,res) => {
    try {

        const deleteincome = await incomeModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"delete incomeData successfully ....",
            data:deleteincome
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

// update income api
const updateIncome = async (req,res) => {
    try {

        const updateincome = await incomeModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message:"Update income data successfully....",
            data:updateincome
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

// last 30 days income data
const last30daysincome = async (req,res) => {
    try {

        const income = await incomeModel.find().sort({transactionDate: -1}).limit(10);
        res.status(200).json({
            message:"last 30 days income data",
            data:income
        })
        
    } catch (err) {
        res.status(500).json({
            message:"last 30 days income data",
            data:err
        })
    }
}

module.exports = {
    addIncome,
    getAllIncome,
    deleteIncome,
    updateIncome,
    last30daysincome
}