// import {updateUser, deleteUser, singleUser, allUsers} from './userController.js';
import express from 'express';
import {authenticate, restrict} from './verifyToken.js'
import ex from './models.js';
const router = express.Router();

// router.get('/:id' ,authenticate,restrict(['Patient']), singleUser);
// router.get('/', allUsers);
// router.put('/:id', authenticate,restrict(['Patient']),updateUser);
// router.delete('/:id', authenticate,restrict(['Patient']),deleteUser);

router.post('/patientRegistration',async (req,res)=>{
    try{
        const patientData = req.body;
        const newPatient = new ex.models.Patient({
            username : patientData.patientId,
            name: patientData.patientName,
            age: patientData.patientAge,
            gender: patientData.patientGender,
            contactNumber: patientData.patientMobile,
            bloodGroup : patientData.patientBloodGroup
        });

        newPatient.save();
        res.send({message : 'patient registered'});
    }
    catch(e)
    {
        console.log(e);
    }
})

router.get('/getPatientDetails/:patientId', async (req,res)=>{
    try{
        const patientId = req.params.patientId;
        await ex.models.Patient.findOne({username : patientId}).then((data)=>{
        res.send({patientData : data, message : "patient retrieved"});
        });
    }
    catch(e)
    {
        console.log(e);
    }
})

router.post('/updateAppointments', async (req, res)=>{
    try{
        console.log(req.body);
        const patientId = req.body.patientId;
        const appDate = req.body.AppointmentDate;
        const docName = req.body.DoctorName;
        const newApp = new ex.models.Appointment({
            patientId : patientId,
            doctorName: docName,
            appointmentDate: appDate,
        });

        newApp.save();
        res.send({message : 'appointment added'});
    }
    catch(e)
    {
        console.log(e);
    }
})

router.get('/getAllAppointments/:date', async (req, res) => {
    try {
      const appDate = req.params.date;
  
      // Find appointments for the specified date
      const appointments = await ex.models.Appointment.find({ appointmentDate: appDate });
  
      // Fetch patient details for each appointment concurrently
      const promises = appointments.map(async (app) => {
        const patient = await ex.models.Patient.findOne({ username: app.patientId });
        return {
          appDate,
          patientId: app.patientId,
          patientContact: patient.contactNumber,
          patientName : patient.name,
          doctorName: app.doctorName,
        };
      });
  
      // Wait for all patient details to be fetched and flatten the results
      const displayApps = await Promise.all(promises);
  
      console.log(displayApps);
      res.json(displayApps); // Send the constructed displayApps array as the response
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching appointments' }); // Handle errors gracefully
    }
  });

export default router;