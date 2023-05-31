import Twilio from 'twilio';

const accountSid = 'AC15608a066fab62084b51c676feb74bb0';
const authToken = '4adebb90796d41b775cd5e6bb55c6673';
const client = Twilio(accountSid, authToken);

client.messages
  .create({
    body: "We have meeting",
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+2349029985332',
    
  })
  .then(message => console.log(message.sid))
  
