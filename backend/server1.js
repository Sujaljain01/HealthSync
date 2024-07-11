import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose'
import { register, login, logout } from './authControl.js';
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
    credentials: true,
    optionSuccessStatus: 200
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
app.use('/doctors', doctorRouter);



// app.get('/api/precautions/:healthIssue', async (req, res) => {
//   const healthIssue = req.params.healthIssue;
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const prompt = `Give me 6 precautions in pointwise for health issue ${healthIssue} ,each precautions should not be more than 5 words`;

// app.get('/api/precautions/:patientId', async (req, res) => {
//     // const healthIssue = req.params.healthIssue;
//     const id = req.params.patientId;
//     console.log(id)
//       await ex.models.Patient.findOne({username : id}).then(async (p)=>{
//           const healthIssue = p.healthIssues;
//           console.log(healthIssue[0])
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  
//     const prompt = `Provide detailed below information on the disease called ${healthIssue},each should contain only 5 points:
//       Information
//       (line space)
//       Symptoms (each with a tab space)
//       (line space)
//       Risk factors (each with a tab space)
//       (line space)
//       Precautions (each with a tab space)
//       (line space)
//       Importance of Medication prescribed by the doctor (line space)
      
      
//       *Example output is given below:*
//       Information: Chest pain
  
//       Symptoms:
//       Fluttering in your chest (palpitations)    Slow heartbeat (bradycardia)    Chest pain or tightness  Lightheadedness or dizziness    Fainting (syncope)
  
//       Risk factors:
//       Age (arrhythmias are more common in older adults)   Heart disease   High blood pressure    Diabetes    Obesity
  
//       Precautions:
//       Maintain a healthy weight   Eat a healthy diet  Exercise regularly  Manage stress
  
//       Importance of Medication:
//       If you have a heart condition, it's important to follow your doctor's treatment plan to help reduce your risk of arrhythmias`;
  
//     try {
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = await response.text();
  
//         // Parsing the response text into structured data
//         const sections = text.split('\n\n').filter(section => section.trim() !== '');
//         const structuredData = {
//           information: sections[1].trim(),
//           symptoms: sections[2].replace('Symptoms:', '').split('\t').map(item => item.trim()).filter(item => item),
//           riskFactors: sections[3].replace('Risk factors:', '').split('\t').map(item => item.trim()).filter(item => item),
//           precautions: sections[4].replace('Precautions:', '').split('\t').map(item => item.trim()).filter(item => item),
//           medicationImportance: sections[5].trim()
//         };
  
//         res.json(structuredData);
//     } catch (error) {
//         console.error("Error generating content:", error);
//         res.status(500).send("Error generating content");
//     }
//   });
//   })



app.get('/api/precautions/:patientId', async (req, res) => {
    const id = req.params.patientId;
    await ex.models.Patient.findOne({ username: id }).then(async (p) => {
        console.log(p)
        const healthIssue = p.healthIssues[0];
        console.log(healthIssue)
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });


        const prompt = `Provide the information on a given health issue "${healthIssue}" in the provided output format:
Symptoms:

Symptom 1
Symptom 2
Symptom 3
Symptom 4
Symptom 5


Risk Factors:

Risk factor 1
Risk factor 2
Risk factor 3
Risk factor 4


Precautions:

Precaution 1
Precaution 2
Precaution 3
Precaution 4
Precaution 5

dont display anything except the above asked,if you get less content just print that much only`;


  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    // const jsonResponse = JSON.parse(text);
       
      res.json(text);
  } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("Error generating content");
  }
});
})

mongoose.connect("mongodb://127.0.0.1:27017/healthManagement2", { UseNewUrlParser: true }).then(function () {
    console.log("connected")
}).catch(function (err) {
    console.log(err);
});



app.post('/register', register);
app.post('/login', login);
app.get('/logout', logout);

//twilio
const accountSid = 'ACc076b7980df17815d24d60a33fc87565';
const authToken = 'e4b4db9013152b3cbe80b40939595856';
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

function getTime(medTime) {
    console.log(medTime)
    const match = medTime.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) {
        return res.status(400).send('Invalid time format. Please use HH:MM format.');
    }

    const hours = match[1];
    const minutes = match[2];
    console.log(`${minutes} ${hours} 8 6 6`);
    return `${minutes} ${hours} 8 6 6`
}

app.get('/constructSchedule', async (req, res) => {
    let contact = '';
    let name = '';
    await ex.models.Medicine.find().then(async (meds) => {
        meds.forEach(async (med) => {
            const id = med.patientId;
            await ex.models.Patient.findOne({ username: id }).then((p) => {
                contact = p.contactNumber;
                name = p.name;
            });
            console.log(med)
            const sche = new ex.models.Schedule({
                to: '+917815076276',
                body: `Hello ${name}, \n It's time to take ${med.medName} of dose ${med.dosage} ${med.duration}`,
                schedule: getTime(med.medTime)

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

//twilio call

import schedule from 'node-schedule';

app.use(bodyParser.json());

// const TWILIO_ACCOUNT_SID = 'ACc076b7980df17815d24d60a33fc87565'
// const TWILIO_AUTH_TOKEN = 'e4b4db9013152b3cbe80b40939595856'

// let call_data = [
//     {
//         "call_time": "2024-06-08 00:35:00"
//     }
// ]


app.get('/fetch-and-schedule-tasks', async (req, res) => {
    try {
        const call_data = await ex.models.Appointment.find();
        console.log(call_data)
        call_data.forEach(call => {
            console.log(call.appointmentDate)
            const call_time = `${call.appointment} 11:50:00`
            const callDate = new Date(call_time);
            console.log(callDate)
            schedule.scheduleJob(callDate, () => {
                scheduleTask();
            });
        });
        res.status(200).send('All tasks scheduled successfully!');
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).send('Internal server error.');
    }
});

const scheduleTask = () => {
    // app.get('/call', async (req,res)=>{
        
    try {
        client.calls.create({
            twiml: '<Response><Say>Appoinment Today</Say></Response>',
            to : '+917815076276',
            from: '+17652955927'
        }).then(call => {
            console.log(`Call initiated: ${call.sid}`);
        }).catch(error => {
            console.error(`Error initiating call: ${error}`);
        });
           
    } catch (error) {
        console.error('Error scheduling task:', error);
    }
    };

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});