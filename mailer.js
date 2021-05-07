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
                for (let j=0;j < ENV.mailOptions.length; j++) {
                    mailOptions[j].text += locations[i].id + ' ' + locations[i].name + '\n';
                }
            }
            for (let k=0;k < ENV.mailOptions.length; k++) {
                mailOptions[k].text +=  'Link: https://www.impfen-saarland.de/service/waitlist_entries \n';
                transporter.sendMail(mailOptions[k], function (error, info) {
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
