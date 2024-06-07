import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose'
import {register, login, logout} from './authControl.js';
import patientRouter from './patientRoutes.js';
import doctorRouter from './doctorRoutes.js';
import multer from 'multer';
import twilio from 'twilio';
import dotenv from "dotenv";
import ex from './models.js';
import cron from 'node-cron';
import axios from 'axios';
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
app.use('/files', (req, res, next) => {
    console.log(`Request for static file: ${req.path}`);
    next();
}, express.static('files'));

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


// app.get('/api/precautions/:healthIssue', async (req, res) => {
//   const healthIssue = req.params.healthIssue;
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const prompt = `Give me 6 precautions in pointwise for health issue ${healthIssue} ,each precautions should not be more than 5 words`;

//   try {
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const text = await response.text();

//       const precautions = text.split('\n').map(item => item.trim()).filter(item => item);

//       res.json(precautions);
//   } catch (error) {
//       console.error("Error generating content:", error);
//       res.status(500).send("Error generating content");
//   }
// });


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

//twilio
const accountSid ='ACc076b7980df17815d24d60a33fc87565';
const authToken =  'e4b4db9013152b3cbe80b40939595856';
const client = twilio(accountSid, authToken);
const scheduledMessages = [];

// Endpoint to schedule a message
app.get('/fetch-and-schedule-messages', async (req, res) => {
    try {
        const schedules = await ex.models.Schedule.find();
        for (const schedule of schedules) {
            scheduleMessage(schedule);
            
            console.log('Scheduled message response');
        }
        console.log('All messages scheduled successfully!');
        }
    catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).send('Internal server error.');
    }
});

const scheduleMessage = ({ to, body, schedule }) => {

    try {
        const task = cron.schedule(schedule, () => {
            client.messages.create({
                body,
                from: '+17652955927',
                to
            }).then(message => {
                console.log(`Message sent: ${message.sid}`);
            }).catch(error => {
                console.error(`Error sending message: ${error}`);
            });
        });

        scheduledMessages.push(task);

        console.log('Message scheduled successfully!');
    } catch (error) {
        console.log(`Error scheduling message: ${error}`);
    }
}

// Endpoint to list all scheduled messages
app.get('/scheduled-messages', (req, res) => {
    res.json({
        scheduledMessages: scheduledMessages.length,
        schedules: scheduledMessages.map((task, index) => ({
            id: index,
            cronTime: task.getCronTime().toString()
        }))
    });
});

function getTime(medTime)
{
    console.log(medTime)
    const match = medTime.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) {
        return res.status(400).send('Invalid time format. Please use HH:MM format.');
    }

    const hours = match[1];
    const minutes = match[2];
    console.log(`${minutes} ${hours} 7 6 5`);
    return `${minutes} ${hours} 7 6 5`
}

app.get('/constructSchedule', async (req,res)=>{
    let contact = '';
    let name = '';
    await ex.models.Medicine.find().then(async (meds)=>{
        meds.forEach(async (med)=>{
            const id = med.patientId;
            await ex.models.Patient.findOne({username : id}).then((p)=>{
            contact = p.contactNumber;
            name = p.name;
        });
        console.log(med)
        const sche = new ex.models.Schedule({
            to : '+917815076276',
            body : `Hello ${name}, \n It's time to take ${med.medName}`,
            schedule : getTime(med.medTime)
            
        });



        sche.save();
        })
        
    })
})

const cronTime = "50 4 7 6 5";
function isValidCronTime(cronTime) {
    // Regular expression for matching the cron expression pattern
    const cronRegex = /^(\*|[0-9]{1,2})(\/[0-9]{1,2})?(\,[0-9]{1,2})*(\-[0-9]{1,2})?(\-[0-9]{1,2})?(\s+(\*|[0-9]{1,2})(\/[0-9]{1,2})?(\,[0-9]{1,2})*(\-[0-9]{1,2})?(\-[0-9]{1,2})?){4}$/;

    console.log(cronRegex.test(cronTime));
}
isValidCronTime(cronTime)


app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });