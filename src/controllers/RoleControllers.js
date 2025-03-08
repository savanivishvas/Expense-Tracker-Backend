const roleModel = require("../models/RoleModel");

// add role api
const addRole = async (req, res) => {
    try {

        const createdRole = await roleModel.create(req.body);

        res.status(201).json({
            message: "create role successflly...",
            data:createdRole
        });
        
    } catch (err) {
        res.status(500).json({
            message:"Error ....",
            data:err
        })
    }
}

// get allrole api
const getallroles = async (req,res) => {

    try {

        const allroles = await roleModel.find();
        res.status(200).json({
            message:"all roles ....",
            data:allroles
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

// get roleby id
const getRoleById = async (req,res) => {
    try {

        const foundRole = await roleModel.findById(req.params.id);
        res.status(200).json({
            message:"found role successfully...",
            data:foundRole
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

// deleterole api
const deleteRole = async (req,res) => {

    try {

        const deleteRole = await roleModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"delete role successfully....",
            data:deleteRole
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
    
}

module.exports = {
    addRole,getallroles,getRoleById,deleteRole
}