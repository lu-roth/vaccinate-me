const ENV = require('./env')
module.exports = {
    sendMail,
}

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
    ENV.transporter
);

let mailOptions = ENV.mailOptions;

function sendMail(locations) {
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            for (let i=0;i < locations.length; i++){
                mailOptions.text += locations[i].id + ' ' + locations[i].name + '\n Link:' + ENV.baseUrl +  locations[i].id + '\n'
            }
            for (let i=0;i < ENV.mailOptions.length; i++) {
                transporter.sendMail(ENV.mailOptions[i], function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        }
    });
}
