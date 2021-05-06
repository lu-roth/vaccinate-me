//Base Url of your Vaccine Center
exports.baseUrl = 'https://www.impfen-saarland.de/service/api/left_over/availabilities.json?event_category_id=';

//SMTP Settings
exports.transporter = {
    host: "stmp.examplehost.com",
    port: 465,
    secure: true,
    auth: {
        user: "user@yoursmtpuser.com",
        pass: "yourpassword"
    }};

//Mailoptions
exports.mailOptions = {
    from: 'senderemail@sendermail.com',
    to: 'recievermail@recievermail.com',
    subject: 'Subject',
    text: 'Message Body'
};
