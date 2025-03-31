//to,from,subject,text
const mailer = require("nodemailer");

///function

const sendingMail = async (to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"vishvassavani456@gmail.com",
            pass:"pnjn vzmg httk nzwm",
        }
    })

    const mailOptions = {
        from: 'vishvassavani456@gmail.com',
        to: to,
        subject: subject,
        //text: text
        html:text
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    // console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}
// sendingMail("vishvassavani456@gmail.com","Test Mail","this is test mail")

