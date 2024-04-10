const nodemailer = require("nodemailer");

const sendMail = async (messageoption) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 25,
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

    try {
        // Send the email and wait for the result
        const info = await transporter.sendMail(mailOptions);
         console.log('email sent successfully')
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
         console.log(error.message)
        return { success: false, message: "Email sending failed" };
    }
};

module.exports = sendMail;
