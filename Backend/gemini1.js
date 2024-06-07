import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;
app.use(cors());

const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY is missing in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

app.get('/generate', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Provide detailed information on the disease called fever. It should be in very simple language explaining:
    Information about the disease (line space)
   Symptoms (line space)
   Risk factors (line space)
   Precautions (line space)
   Importance of Medication prescribed by the doctor (line space)
     
   Example of the output is given below:
   for Heart arrhythmia  
   Heart arrhythmia is an irregular heartbeat. It occurs when the electrical signals that coordinate your heart's beats malfunction. A healthy heart beats in a regular rhythm, pumping blood efficiently throughout your body. With arrhythmia, the heart may beat too fast (tachycardia), too slow (bradycardia), or with an irregular pattern.

   Symptoms:
   Fluttering in your chest (palpitations)    Slow heartbeat (bradycardia)    Chest pain or tightness  Lightheadedness or dizziness    Fainting (syncope)

   Risk factors:
Age (arrhythmias are more common in older adults)   Heart disease   High blood pressure    Diabetes    Obesity

   Precautions:
   Maintain a healthy weight   Eat a healthy diet  Exercise regularly  Manage stress

   If you have a heart condition, it's important to follow your doctor's treatment plan to help reduce your risk of arrhythmias`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
