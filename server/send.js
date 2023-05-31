import express from 'express';
import cors from 'cors';
import axios from 'axios';
import request from 'request';

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define a route to handle form submissions
app.post('/submit',  async (req, res) => {
  const { number, email, message,  } = req.body;

  // const options = {
  //   method: 'POST',
  //   url: 'https://api.sendchamp.com/api/v1/sms/send', 
  //   headers: {
  //     Accept: 'application/json,text/plain,*/*',
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer sendchamp_live_$2a$10$7zRcO.k7nq40jOTuQhhGl.drDV66cmkuOwEqvdB4iax4zsLkN76va'
  //   },
  //   form: {
  //     to: '2347051807727',
  //     message: 'No lie that last message make sense',
  //     sender_name: 'Sendchamp',
  //     route: 'dnd'
  //   }
  // };

  const requestBody = {
    to: number,
    message: message,
    sender_name: 'Sendchamp',
    route: 'dnd'
  }

  console.log(requestBody);
  
  const config = {
    headers:{
      Authorization: "Bearer sendchamp_live_$2a$10$7zRcO.k7nq40jOTuQhhGl.drDV66cmkuOwEqvdB4iax4zsLkN76va"
    }
  }

  axios.post('https://api.sendchamp.com/api/v1/sms/send', requestBody, config).then(()=>console.log("Thank God"))
  .catch((err)=> console.log(err))
  

  res.json(req.body)
  

  

  
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* try {
    const response = await axios(options);
    console.log('SMS sent successfully:', response.data);
    res.json({ success: true, message: 'SMS sent successfully' });
  } catch (error) {
    console.error('There was an error sending the SMS:', error);
    res.status(500).json({ success: false, message: 'Failed to send SMS' });
  } */
  
  /* request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
 */
