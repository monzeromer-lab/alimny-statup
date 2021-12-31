const nodemailer = require("nodemailer"),
    dotenv = require('dotenv');

// get config vars
dotenv.config();

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

/**
 * 
 * @param {string} from 
 * @param {string} to 
 * @param {string} verficationCode 
 */
module.exports.verificationEmail = function (to, verficationCode) {
    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: "Verify Your Email!",
        text: `please verify your account using this link: \n http://localhost:3023/profile/verify/${verficationCode}`
    }
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log(info);
                resolve(info)
            }
        })
    });
}

module.exports.resetMail = function(to, code){
    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: "Password Reset",
        text: `
        we have noticed that you requested to reset your password

        to reset your password follow this link:
        http://localhost:3023/profile/reset/${code}
        
        or you can just enter the following code in the code input
        ${code}`
    }
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log(info);
                resolve(info)
            }
        })
    })
}