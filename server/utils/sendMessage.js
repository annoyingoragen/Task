const twilio = require('twilio');

const accountSid = 'ACcb1f111751c78f9569465e085fd2edd7';
const authToken = 'd0266368ea8a898d2a1eb289f9fc3722';
const client = new twilio(accountSid, authToken);






const sendMessage=async(options)=>{
  
  console.log(options)
    client.messages
      .create({
        body: options.body,
        to: options.to, 
        from: '+13022068733'
      })
      .then((message) => {
        console.log(message.sid);
        // res.status(200).json({ message: 'OTP sent successfully' });
      })
      .catch((error) => {
        console.log(error);
        // res.status(500).json({ error: 'Failed to send OTP' });
      });


}


module.exports=sendMessage;

