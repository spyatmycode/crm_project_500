import express from 'express';
import cors from 'cors';

const app = express()

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

app.post('/submit', async(req,res)=>{
    console.log("The data got here");

    res.json()
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});