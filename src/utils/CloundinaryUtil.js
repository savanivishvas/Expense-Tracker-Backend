const cloundinary = require("cloudinary").v2;


const uploadFileToCloudinary = async (file) => {

        cloundinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.cloud_key,
        api_secret: process.env.cloud_api_secret
    })

    const cloundinaryResponse = await cloundinary.uploader.upload(file.path,{
        timeout: 220000,
    });
    return cloundinaryResponse;

};
module.exports = {
    uploadFileToCloudinary
}