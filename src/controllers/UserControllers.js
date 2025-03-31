const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mailUtil = require("../utils/MailUtil");
const secret = "secret";

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

        req.body.password = hashedPassword;

        const createdUser = await userModel.create(req.body);
        // console.log(createdUser);
        
        // await mailUtil.sendingMail(
        //     createdUser.email,
        //     "welcome to Expense Tracker",
        //     "this is welcome mail"
        //   );
          
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

// updare getUserById api
const updateUserById = async (req,res) => {
    try {

        const foundUser = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true }
        );

        res.status(200).json({
            message:"update user successfully ....",
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

// add profilepicturewithfilr
const addUserWithFile = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      // database data store
      //cloundinary
      console.log(req.body);
      res.status(200).json({
        message: "File uploaded successfully",
        data: req.file,
      });
    }
  });
};

// forgot password api
const forgotpassword = async (req,res) => {

    const email = req.body.email;
    const foundUser = await userModel.findOne({ email : email});

    if (foundUser) {
        const token = jwt.sign(foundUser.toObject(), secret);
        // console.log(token);
        const url = `http://localhost:5173/resetpassword/${token}`;
        const mailContent = `<html>
                              <a href ="${url}">rest password</a>
                            </html>`;
        // email throught...
        await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
        res.json({
          message: "reset password link sent to mail.",
          data:email
        });
      } else {
        res.json({
          message: "user not found register first..",
        });
      }
}

const resentpassword = async (req,res) => {

    const token = req.body.token;          //decode --> email | id
    const newPassword = req.body.password;

    const userFormToken = jwt.verify(token,secret);
    //object -->email,id..
    //password encrypt...

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword,salt);

    const updatedUser = await userModel.findByIdAndUpdate(userFormToken._id,{
        password : hashedPassword,
    })

    res.json({
        message: "password updated successfully..",
    });
}


module.exports = {
    loginUser,
    signupUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUser,
    forgotpassword,
    resentpassword,
}