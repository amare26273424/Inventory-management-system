const nodemailer = require("nodemailer");

const sendMail = async (messageoption) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service: 'gmail',
        auth:{
            user: 'amarehagos26273425@gmail.com',
            pass: 'vzvq ldpa fcho xxmm',
        },
    });

    const mailOptions = {
        from:'amarehagos26273424@gmail.com',
        to: messageoption.email,
        subject: messageoption.subject,
        text: messageoption.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;