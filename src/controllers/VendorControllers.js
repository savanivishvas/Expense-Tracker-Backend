const vendorModel = require("../models/VendorModel");

// addvendor api
const addVendor = async (req,res) => {
    try {

        const createVendor = await vendorModel.create(req.body);
        res.status(201).json({
            message:"vendor create successfully....",
            data:createVendor
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

// getallVendor api
const getAllVendor = async(req,res) => {
    try {

        const allVendors = await vendorModel.find();
        res.status(200).json({
            message:"all vendors...",
            data:allVendors
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error...",
            data:err
        })
    }
}

// getvendorbyvendorId api
const getVendorByVendorId = async (req,res) =>{
    try {

        
    } catch (err) {
        res.status(500).json({
            message:"Error...",
            data:err
        })
    }
}

// deletevendor api

module.exports = {
    addVendor,getAllVendor
}