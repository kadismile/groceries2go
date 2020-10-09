const nodemailer = require('nodemailer');
const kue = require('kue');
const queue = kue.createQueue();
const handlebars = require('handlebars');
const fs = require('fs') ;
const path = require ('path');


const sendEmail = async() => {
  try {
    queue.process('forgotEmailPasswordJob',  function(job, done){
    
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: "Gmail",
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD
        }
      });
    
      const emailData = job.data;
      const filePath = path.join(__dirname, './emails/password_reset.hbs');
      const source = fs.readFileSync(filePath, 'utf-8').toString();
      const template = handlebars.compile(source);
      const htmlToSend = template(emailData);
      const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: emailData.email,
        subject: emailData.subject,
        html:htmlToSend
      };
      transporter.sendMail(message);
      done()
    });
  } catch (e) {
    console.log("error _____", e)
  }
};

module.exports = sendEmail;