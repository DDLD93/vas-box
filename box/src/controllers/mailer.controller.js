// var nodemailer = require('nodemailer');
// var { host, pass, port, user } = require("../config").nodemailer
// var transporter = nodemailer.createTransport({
//   host, port, auth: { user, pass }
// });
// const postRegister = (receiver, verifyUrl) => {
//     const mailOptions = {
//         from: user, // sender address
//         to: receiver, // list of receivers
//         subject: 'Welcome to Krystal App ', // Subject line
//         html: `
//             <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8">
//       <title>Email Verification</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 0;
//         }
    
//         .container {
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//         }
    
//         h2 {
//           color: #333;
//           margin-bottom: 20px;
//         }
    
//         p {
//           color: #555;
//           line-height: 1.5;
//           margin-bottom: 10px;
//         }
    
//         .button {
//           display: inline-block;
//           background-color: #4CAF50;
//           color: white;
//           padding: 10px 20px;
//           text-decoration: none;
//           border-radius: 4px;
//         }
    
//         .button:hover {
//           background-color: #45a049;
//         }
//       </style>
//     </head>
//     <body>
    
//       <table class="container" cellspacing="0" cellpadding="0" border="0">
//         <tr>
//           <td>
//             <h2>Login Credentials</h2>
    
//             <p>Dear User,</p>
    
//             <p>Thank you for signing up! To complete your registration, please click on the button below to verify your email address:</p>
    
//             <p><p class="button">${}</p></p>
    
//             <p>If the above credentials doesn't work, :</p>

    
//             <p>Thank you for choosing our service!</p>
    
//             <p>Sincerely,<br>Your Company Name</p>
//           </td>
//         </tr>
//       </table>
    
//     </body>
//     </html>
    
//             `// plain text body
//       };
//       transporter.sendMail(mailOptions, function (err, info) {
//         if (err)
//           console.log(err)
//         else
//           console.log(info);
//       })
// }