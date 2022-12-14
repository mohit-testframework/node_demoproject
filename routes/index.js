var express = require('express')
var cors = require('cors')
var nodemailer = require('nodemailer')
var router = express.Router()
var smtpTransport = require('nodemailer-smtp-transport')
var smtpPool = require('nodemailer-smtp-pool')
var app = express()
// var cors = require('cors')
var xoauth2 = require('xoauth2')
var wellknown = require('nodemailer-wellknown')
var swig = require('swig')
var template = swig.compileFile(__dirname + '/../templates/bugreply.html')
var plainTemplate = swig.compileFile(__dirname + '/../templates/bugreply.txt')


// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//      "335529948757-t2cnlt3jmdmf477sj0ofrq29ctfrorjg.apps.googleusercontent.com",
//      "zrAfhAYfrdQ6uzAa9mG8SGeY",
//      "https://developers.google.com/oauthplayground" // Redirect URL
// );

// oauth2Client.setCredentials({
//      refresh_token: "1//04yz4-V748oWQCgYIARAAGAQSNwF-L9IrIIJjVTGB2uWNrHIxzuL_dC0zocFSqnrssMW1gUO34K0k-Nm2bRJmBH5VxNKmSZ1x6Iw"
// });

// const accessToken = oauth2Client.getAccessToken()

// var transporter1 = nodemailer.createTransport('SMTP', {
//      host: "smtpout.secureserver.net",
//      secureConnection: false,
//      service: "gmail",
//      auth: {
//           type: "OAuth2",
//           user: "mohit@testframework.io", 
//           clientId: "335529948757-t2cnlt3jmdmf477sj0ofrq29ctfrorjg.apps.googleusercontent.com",
//           clientSecret: "zrAfhAYfrdQ6uzAa9mG8SGeY",
//           refreshToken: "1//04yz4-V748oWQCgYIARAAGAQSNwF-L9IrIIJjVTGB2uWNrHIxzuL_dC0zocFSqnrssMW1gUO34K0k-Nm2bRJmBH5VxNKmSZ1x6Iw",
//           accessToken: accessToken
//      },
//      tls: {
//   rejectUnauthorized: false
// }
// });


// var transporter1 = nodemailer.createTransport('SMTP', {
//   service: 'gmail',
//   auth: {
//     user: 'alpinelabssubmitabug@gmail.com',
//     pass: 'AlpSupp0rt!!'
//   }
// })


// var transporter1 = nodemailer.createTransport('SMTP', {
//     service: "gmail",  
//     auth: {       
//       user:  process.env.GOOGLE_EMAIL_TESTFRAMEWORK,
//       pass:  process.env.GOOGLE_PASSWORD_TESTFRAMEWORK     
//     }
// })

// var transporter1 = nodemailer.createTransport('SMTP', {
//   service: 'gmail',
//   auth: {
//     user: 'alpinelabssubmitabug@gmail.com',
//     pass: 'AlpSupp0rt!!'
//   }
// })

// var transporter1 = nodemailer.createTransport('SMTP', {
//   service: 'gmail',
//   secureConnection: false,
//   port: 587,
//   auth: {       
//     user: 'mohit@testframework.io',
//     pass: '*hHrA9LP'      
//   }
// })

// var transporter1 = nodemailer.createTransport('SMTP', {
//   host: "smtpauth.earthlink.net",  
//   secureConnection: false,
//   port: 587,
//   auth: {       
//       user:  process.env.EARTHLINK_EMAIL,
//       pass:  process.env.EARTHLINK_PASSWORD        
//   }
// })

// var transporter1 = nodemailer.createTransport('SMTP', {
//   host: "smtpout.secureserver.net",  
//   secureConnection: false,
//   port: 587,
//   auth: {
//       user: process.env.GODADDY_EMAIL_NEW,
//       pass: process.env.GODADDY_PASSWORD_NEW
//   }
// })


// var transporter2 = nodemailer.createTransport('SMTP', {
//   host: "smtpout.secureserver.net",  
//   secureConnection: false,
//   port: 587,
//   auth: {
//       user: 'support@alpinelaboratories.com',
//       pass: 'Alp1neLabs!!'
//   }
// })

// var transporter2 = nodemailer.createTransport('SMTP', {
//   host: "smtpout.secureserver.net",  
//   secureConnection: false,
//   port: 587,
//   auth: {
//       user: process.env.GODADDY_EMAIL,
//       pass: process.env.GODADDY_PASSWORD
//   }
// })

var transporter2 = nodemailer.createTransport('SMTP', {
  host: "smtpout.secureserver.net",
  secureConnection: false,
  port: 587,
  auth: {       
    user: 'alpinelabssubmitabug@gmail.com',
    pass: 'yrznwbrdnufnlkww'      
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/email', function(req, res) {
  console.log('request made to the email api')
  // console.log('res  : ' , res);

  var markup = [
    '<div>Firmware Version: <b>' + req.body.firmwareVersion + '</b></div>',
    '<div>App Version: <b>' + req.body.appVersion + '</b></div>',
    '<div>Device Model: <b>' + req.body.deviceModel + '</b></div>',
    '<div>Device Platform: <b>' + req.body.devicePlatform + '</b></div>',
    '<div>Device OS: <b>' + req.body.deviceVersion + '</b></div>',
    // '<div>Firmware Type: <b>' + req.body.firmwareType + '</b></div>',
    '<div style="margin-top:20px;">' + req.body.comments + '</div>'
  ]
  var html = markup.join('')

  var mailOptions = {
    from: req.body.email, // sender address
    to: 'support@alpinelaboratories.com', // list of receivers
    subject: req.body.firstName + ' ' + '(' + req.body.email + ')', // Subject line
    html: html
  }

  if (req.body.attachment) {
    mailOptions.attachments = [
      {
        filename: 'error.log',
        contents: req.body.attachment
      }
    ]
  } else {
    mailOptions.text += ' (No attachment was provided)'
  }

  console.log('attempting to send email')

  // send mail with defined transport object

  // transporter1.sendMail(mailOptions, function(error, info) {
  //   console.log('info is: ' + info)
  //   if (error) {
  //     console.log('we got an error' + error)
  //     res.status(403).json('error', {
  //       error: 'failed to send email'
  //     })
  //   } else {
  //     console.log('bug report submitted successfully')
  //     res.status(200).json({
  //       success: true
  //     })

  //     sendEmailBackToReporter(req.body)
  //   }
  //   transporter1.close()
  // })

  transporter1.sendMail(mailOptions, function(error, info) {
    console.log('info is : ' + JSON.stringify(info));
    console.log('error : ' + JSON.stringify(error));

    if (error) {
      console.log('we got an error' + error)
      // res.json({
      //   error: error
      // })

      if(error.error){
        console.log('inside error.error');
        let err = error.error;
        res.status(400).send({ err });

      }else {
        console.log('else error.error');
        res.status(400).send({ error });  

      }

    } else {

      console.log('bug report submitted successfully')

      sendEmailBackToReporter(req.body, res)
    }
    transporter1.close();

  })


})


// function sendEmailBackToReporter(options) {

//    console.log('inside sendEmailBackToReporter');

   
//   var fontPath = __dirname + '/../assets/fonts/'
//   var imagePath = __dirname + '/../assets/images/alpine-logo.png'

//   var html = template({
//     firstName: options.firstName,
//     fontPath: fontPath,
//     imagePath: imagePath
//   })
//   var plainText = plainTemplate({
//     firstName: options.firstName
//   })
//   var mailOptions = {
//     from: 'support@alpinelaboratories.com', // sender address
//     to: options.email, // list of receivers
//     subject: 'Thanks for reporting your issue', // Subject line
//     html: html,
//     text: plainText
//   }

//   console.log('sending email back to ' + options.email)

//   // send mail with defined transport object
//   transporter2.sendMail(mailOptions, function(error, info) {
//     console.log('info is: ' + info)
//     if (error) {
//       console.log('we got an error' + error)
//     } else {
//       console.log('Successfully sent email back to user')
//     }
//     transporter2.close()
//   })
// }

function sendEmailBackToReporter(options, res) {

  console.log('inside sendEmailBackToReporter');

  var fontPath = __dirname + '/../assets/fonts/'
  var imagePath = __dirname + '/../assets/images/alpine-logo.png'

  var html = template({
    firstName: options.firstName,
    fontPath: fontPath,
    imagePath: imagePath
  })
  var plainText = plainTemplate({
    firstName: options.firstName
  })
  var mailOptions = {
    from: 'support@alpinelaboratories.com', // sender address
    to: options.email, // list of receivers
    subject: 'Thanks for reporting your issue', // Subject line
    html: html,
    text: plainText
  }

  console.log('sending email back to ' + options.email)

  // send mail with defined transport object
  transporter2.sendMail(mailOptions, function(error, info) {
    console.log('info is: ' + info)
    if (error) {
       res.status(400).send({ error });
      console.log('we got an error' + error)
    } else {
       res.status(200).json({ success: true })
      console.log('Successfully sent email back to user')
    }
    transporter2.close()
  })
}


module.exports = router
