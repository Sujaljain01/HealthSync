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

app.get('/api/precautions/:patientId', async (req, res) => {
  // const healthIssue = req.params.healthIssue;
  const id = req.params.patientId;
    await ex.models.Patient.find({username : id}).then(async (p)=>{
        const healthIssue = p.healthIssues;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });


  const prompt = `Provide detailed below information on the disease called ${healthIssue},each should contain only 5 points:
    Information
    (line space)
    Symptoms (each with a tab space)
    (line space)
    Risk factors (each with a tab space)
    (line space)
    Precautions (each with a tab space)
    (line space)
    Importance of Medication prescribed by the doctor (line space)
    
    
    **Example output is given below:**
    Information: Chest pain

    Symptoms:
    Fluttering in your chest (palpitations)    Slow heartbeat (bradycardia)    Chest pain or tightness  Lightheadedness or dizziness    Fainting (syncope)

    Risk factors:
    Age (arrhythmias are more common in older adults)   Heart disease   High blood pressure    Diabetes    Obesity

    Precautions:
    Maintain a healthy weight   Eat a healthy diet  Exercise regularly  Manage stress

    Importance of Medication:
    If you have a heart condition, it's important to follow your doctor's treatment plan to help reduce your risk of arrhythmias`;

  try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      // Parsing the response text into structured data
      const sections = text.split('\n\n').filter(section => section.trim() !== '');
      const structuredData = {
        information: sections[0].trim(),
        symptoms: sections[1].replace('Symptoms:', '').split('\t').map(item => item.trim()).filter(item => item),
        riskFactors: sections[2].replace('Risk factors:', '').split('\t').map(item => item.trim()).filter(item => item),
        precautions: sections[3].replace('Precautions:', '').split('\t').map(item => item.trim()).filter(item => item),
        medicationImportance: sections[4].trim()
      };

      res.json(structuredData);
  } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("Error generating content");
  }
});
})


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