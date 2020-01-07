const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/',async (req,res) => {
    console.log(req.body);
    const senderName = req.body.Sender;
    const replyEmail = req.body.ReplyEmail;
    const messageBody = req.body.Message;

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        name: "tannerhill.dev",
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
        tls: {
            rejectUnauthorized: false
        },
        logger: true,
        debug: false
    });

    let message = {
        to: "jerrell.blanda26@ethereal.email", // list of receivers
        form: `${senderName} <contact@tannerhill.dev>`,
        subject: `Contact [${senderName}]`, // Subject line
        text: `${messageBody}`, // plain text body
        html: `<p>${messageBody}</p>`
    };

    transporter.sendMail(message,(error,info) => {
        if(error) {
            console.log(error.message);
            res.json({"success":false,"message":error.message});
        }
        
        console.log("Message sent: %s", info.messageId);
        console.log(`Accepted: ${info.accepted}`);
        console.log(`Rejected: ${info.rejected}`);
        console.log(nodemailer.getTestMessageUrl(info));
        res.json({"success":true});
    });
});

module.exports = router;
