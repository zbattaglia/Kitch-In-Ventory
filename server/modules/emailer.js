const nodemailer = require('nodemailer');

  // sendEmail function uses nodemailer to send email
  // either when invite is sent, our automated status email   
module.exports = sendEmail = ( emailInfo ) => {

    const userName = emailInfo.userName;
    const email = emailInfo.email;
    const sender = emailInfo.sender;
    console.log( `Got info in emailer. userName = ${userName}, email = ${email} from ${sender}`)

    body = `<p>Hey ${userName}!<br />
            <br />
            ${sender} has invited you to join a kitchen. Click <a href="http://localhost:3000/">HERE</a> to accept and get started!<br />
            <br />
            Your friends at Kitch-In-Ventory.</p>`

    // if statement to determine if the email is automated (sent from the system) or manually sent from a user
    // adjusts the email content accordingly
    // if( sender === 'system' ) {
    //   body = `Hey ${recipient}! We wanted to start your day off with some positive thoughts!<br /><br />
    //           ${message}<br /><br />
    //           To see some more motivational messages and send one of your own click <a href="http://localhost:3000/">Here</a></p>`
    // }
    // else {
    //   body = `<p>Hey ${recipient}! Your friend ${sender} has some positive thoughts to send your way. <br /><br />
    //           ${message} <br /><br />
    //           To see some more motivational messages and send one of your own click <a href="http://localhost:3000/">Here</a></p>`
    // }

    // nodemailer confiuration. host email is a gmail account
    // username and password are env variables set in the .env file
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: `${process.env.USERNAME}`,
        pass: `${process.env.PASSWORD}`
      }
    })

    // recipients email is passed into function from invite post
    const mailOptions = {
      from: `${process.env.EMAIL}`,
      to: `${email}`,
      subject: `You got an invite!`,
      html:`${body}`
    };

    transporter.sendMail( mailOptions, (err, info) => {
      if(err) {
        console.log( 'error sending email', err );
      }
      else {
        console.log( 'Success!', info );
      }
    })
  }; // end sendEmail