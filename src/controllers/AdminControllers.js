const AdminModel = require("../models/AdminModel");
const adminModel = require("../models/AdminModel");
const bcrypt = require("bcrypt");

// login api
const loginAdmin = async (req,res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const foundAdminFormEmail = await adminModel.findOne({email:email}).populate("roleId");
        // console.log(foundAdminFormEmail);
        
        if(foundAdminFormEmail != null){
        
            const isMatch = bcrypt.compareSync(password,foundAdminFormEmail.password);
    
            if(isMatch == true){
                res.status(200).json({
                    message:"login success",
                    data:foundAdminFormEmail
                })
            }
            else{
                res.status(404).json({
                    message:"Invalid crendients..."
                })
            }   
        }
        else{
            res.status(404).json({
                message:"Email not found..."
            })
        }

        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// signup api
const signupAdmin = async (req,res) => {

    try {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt);

        req.body.password = hashedPassword;
        const createdAdmin = await adminModel.create(req.body);

        res.status(201).json({
            message:"admin created...",
            data:createdAdmin
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// all admin api
const getAllAdmin = async (req,res) =>{
    try {

        const admins = await adminModel.find().populate("roleId");
        res.status(200).json({
            message:"all admins data....",
            data:admins
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// getadminbyid api
const getAdminbyId = async (req,res) => {
    try {
        
        const foundAdmin = await adminModel.findById(req.params.id);
        res.status(200).json({
            message:"found Admin successfully",
            data:foundAdmin
        })


    } catch (err) {
        res.status(500).json({
            message: "Error ....",
            data:err
        })
    }
}

// deleteadmin api
const deleteAdmin = async (req,res) => {
    try {

        const deleteAdmin = await adminModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"delete Admin successfully",
            data:deleteAdmin
        })
        
    } catch (err) {
        res.status(500).json({
            message: "Error ....",
            data:err
        })
    }
}

// add admin api
const addAdmin = async (req,res) => {
    try {

        const addadmin = await adminModel.create(req.body);
        res.status(201).json({
            message: "Add Admin successfully...",
            data:addadmin
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// update admin api
const updateAdmin = async (req,res) => {
    try {

        const updateadmin = await AdminModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        )

        res.status(200).json({
            message:"updated Admin data sucessfully...",
            data:updateadmin
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

module.exports={
    signupAdmin,
    loginAdmin,
    getAllAdmin,
    getAdminbyId,
    deleteAdmin,
    addAdmin,
    updateAdmin
}