const nodemailer = require('nodemailer');
const xoauth2=require('xoauth2');
var smtpTransport=require('nodemailer-smtp-transport');

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
          user: 'netbooxservice@gmail.com',
          clientId: '1037696236931-i84gsppfs0njup6rjhtpv84r733uda9u.apps.googleusercontent.com',
          clientSecret: '-BvTCAoQp74Cusx82VWbzU7m',
          refreshToken: '1/uPhIpY45SI9h2kOnKPtRkxEoSO83Z0y7YsRmIAiJZjk' // this may expire after some time
      })
      
  
    }
  }));
/*
Kafka- Consumer code 
*/
var kafka=require('kafka-node'),
Consumer = kafka.Consumer,
client = new kafka.KafkaClient(),
consumer = new Consumer(client,
    [{ topic: 'updateProfile', offset: 0}, { topic: 'addSubscriptionProfile', offset: 0 }],
    {
        autoCommit: true,
        encoding :'buffer'
    }
);
consumer.on('message', function (message) {
    var mailOptions={}
    var buf = new Buffer(message.value,"binary")
    var decodedMessage = JSON.parse(buf.toString())
    
    mailOptions.from='netbooxservice@gmail.com';
    mailOptions.to=decodedMessage.email;
    
    if(decodedMessage.subscriptionValid){
        mailOptions.subject='Netboox Subscription Starts'
        mailOptions.text='Welcome to Netboox, Your Subscription starts now'
    }
    else{
        mailOptions.subject='Netboox Subscription Canceled'
        mailOptions.text='Your NetBoox Subscription has ended now'
    }
    transporter.sendMail(mailOptions, function(error, info){
        console.log(mailOptions);
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})

consumer.on('error', function (err) {
    console.log('Error:',err);
})

consumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
})

// var mailOptions = {
//     from: 'netbooxservice@gmail.com',
//     to: 'keerthi4308@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
