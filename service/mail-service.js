const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMTP_PASS,
            }
        });
    }

    async sendActivationLink(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: `Activation account on ${process.env.API_URL}`,
            text: '',
            html: `<div>
                        You registred on ${process.env.API_URL}, please click this 
                        <a href=${link}>link</a> to activate your account!
                    </div>`
        });
    }
}

module.exports = new MailService();