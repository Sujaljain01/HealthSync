import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose'
import {register, login, logout} from './authControl.js';
import dotenv from 'dotenv';
import patientRouter from './patientRoutes.js';
import doctorRouter from './doctorRoutes.js';
import multer from 'multer';

const app = express();
const port = 4000;
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const corsOptions = {
    origin: '*',
    credentials : true,
    optionSuccessStatus : 200
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix+file.originalname)
    }
  });


app.use(cors(corsOptions));
app.use('/patients', patientRouter);
app.use('/doctors',doctorRouter);

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