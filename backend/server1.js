import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose'
import {register, login, logout} from './authControl.js';
import patientRouter from './patientRoutes.js';
import doctorRouter from './doctorRoutes.js';
import multer from 'multer';
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";


dotenv.config();

const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY is missing in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);


const app = express();
const port = 4000;
dotenv.config();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/files', express.static('files'));

const corsOptions = {
    origin: '*',
    credentials : true,
    optionSuccessStatus : 200
}
app.use(cors(corsOptions));


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './files')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, uniqueSuffix+file.originalname)
//     }
//   });


app.use(cors(corsOptions));

app.use('/patients', patientRouter);
app.use('/doctors',doctorRouter);


app.get('/api/precautions/:healthIssue', async (req, res) => {
  const healthIssue = req.params.healthIssue;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Give me 6 precautions in pointwise for health issue ${healthIssue} ,each precautions should not be more than 5 words`;

  try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      const precautions = text.split('\n').map(item => item.trim()).filter(item => item);

      res.json(precautions);
  } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("Error generating content");
  }
});


mongoose.connect("mongodb://127.0.0.1:27017/healthManagement2", {UseNewUrlParser : true}).then(function(){
      console.log("connected")}).catch(function(err){
      console.log(err);
});



app.post('/register',register);
app.post('/login',login);
app.get('/logout', logout);
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });