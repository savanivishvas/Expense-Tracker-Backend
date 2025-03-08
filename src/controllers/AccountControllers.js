const accountModel = require("../models/AccountModel");

const createAccount = async (req,res) => {
    try {

        const createdAccount = await accountModel.create(req.body);
        res.status(201).json({
            message:"account create successfully....",
            data:createdAccount
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error...",
            data:err
        })
    }
}

const getAccountById = async (req,res) => {
    try {

        const foundAccount = await accountModel.findById(req.params.id).populate("userId");
        res.status(200).json({
            message:"found Account...",
            data:foundAccount
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

module.exports={
    createAccount,getAccountById
};