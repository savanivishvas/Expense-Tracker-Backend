const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

// login api
const loginUser = async (req,res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const foundUserFormEmail = await userModel.findOne({email:email}).populate("roleId");
        // console.log(foundUserFormEmail);

        if(foundUserFormEmail != null){

            const isMatch = bcrypt.compareSync(password,foundUserFormEmail.password);
    
            if(isMatch == true){
                res.status(200).json({
                    message:"login success",
                    data:foundUserFormEmail
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
const signupUser = async (req,res) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt)
        // const hashedOtp = bcrypt.hashSync(req.body.otp,salt);

        req.body.password = hashedPassword;
        // req.body.otp = hashedOtp;
        const createdUser = await userModel.create(req.body);
        res.status(201).json({
            message:"user created successfully....",
            data: createdUser
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// getAllUser api
const getAllUser = async (req,res) => {
    try {

        const users = await userModel.find().populate("roleId");
        res.status(200).json({
            message: "all users data....",
            data:users
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// getUserById api
const getUserById = async (req,res) => {
    try {

        const foundUser = await userModel.findById(req.params.id);

        res.status(200).json({
            message:"found user successfully ....",
            data:foundUser
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// deleteUser api
const deleteUser = async (req,res) => {
    try {

        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"delete user successfully",
            data:deletedUser
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

module.exports = {
    loginUser,signupUser,getAllUser,getUserById,deleteUser
}