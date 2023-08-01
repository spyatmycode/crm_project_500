import express from 'express';
import cors from 'cors';
import axios from 'axios';
import request from 'request';
import dotenv from "dotenv"
dotenv.config()
const app = express();

console.log(process.env.SENDCHAM_AUTH);

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define a route to handle form submissions
app.post('/submit',  async (req, res) => {
  const { number, email, message,  } = req.body;


  const requestBody = {
    to: number,
    message: message,
    sender_name: 'Sendchamp',
    route: 'dnd'
  }

  console.log(requestBody);
  
  const config = {
    headers:{
      Authorization: process.env.SENDCHAM_AUTH
    }
  }

  axios.post('https://api.sendchamp.com/api/v1/sms/send', requestBody, config).then(()=>console.log("Thank God"))
  .catch((err)=> console.log(err))
  

  res.json(req.body)
  

  

  
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

