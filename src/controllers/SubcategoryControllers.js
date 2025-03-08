const subcategoryModel = require("../models/SubcategoryModel");

// addsubcategory api
const addsubcategory = async (req,res) => {
    try {

        const createdSubcategory = await subcategoryModel.create(req.body);
        res.status(200).json({
            message:"create subcategory....",
            data:createdSubcategory
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

// getcategoriesbycategoryid api
const getSubcategoriesByCategoryId = async (req,res) => {
    try {

        const allSubCategories = await subcategoryModel.find({ categoryId: req.params.categoryId}).populate("categoryId");

        res.status(200).json({
            message:"all subcategories data....",
            data:allSubCategories
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error.....",
            data:err
        })
    }
}


module.exports = {
    addsubcategory,getSubcategoriesByCategoryId
}