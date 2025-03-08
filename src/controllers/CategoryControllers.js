const categoryModel = require("../models/CategoryModel");

// addcategory api
const addCategory = async (req,res) => {
    try {

        const createCategory = await categoryModel.create(req.body);
        res.status(200).json({
            message:"Add account....",
            data:createCategory
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// getallCategories api

const getAllCategories = async (req,res) => {
    try {

        const allCategories = await categoryModel.find();
        res.status(200).json({
            message:"all categories data....",
            data:allCategories
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error.....",
            data:err
        })
    }
}


module.exports={
    addCategory,getAllCategories
}