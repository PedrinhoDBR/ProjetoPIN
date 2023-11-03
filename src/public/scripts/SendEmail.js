// const {PythonShell} = require('python-shell');

// let options = {
//   mode: 'text',
//   pythonPath: "C:/Python311/python.exe",
//   pythonOptions: ['-u'], // get print results in real-time
//   scriptPath: 'teste.py', // replace with the path to your Python script
//   args: ['15', '10'] // replace with the arguments to pass to the Python script
// };

// PythonShell.run('teste.py', options, function (err, results) {
//   if (err) throw err;
//   console.log(results);
// });

const nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'testepin07@gmail.com', // your email
        pass: 'testepin123' // your password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'testepin07@gmail.com', // sender address
    to: 'jpegame07@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});