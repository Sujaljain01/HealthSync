// import {updateUser, deleteUser, singleUser, allUsers} from './userController.js';
import express from 'express';
import { authenticate, restrict } from './verifyToken.js'
import ex from './models.js';
const router = express.Router();

// router.get('/:id' ,authenticate,restrict(['Patient']), singleUser);
// router.get('/', allUsers);
// router.put('/:id', authenticate,restrict(['Patient']),updateUser);
// router.delete('/:id', authenticate,restrict(['Patient']),deleteUser);

router.post('/patientRegistration', async (req, res) => {
    try {
        const patientData = req.body;
        const newPatient = new ex.models.Patient({
            username: patientData.patientId,
            name: patientData.patientName,
            age: patientData.patientAge,
            gender: patientData.patientGender,
            contactNumber: patientData.patientMobile,
            bloodGroup: patientData.patientBloodGroup
        });

        newPatient.save();
        res.send({ message: 'patient registered' });
    }
    catch (e) {
        console.log(e);
        res.send({message : 'error'});
    }
})

router.get('/getPatientDetails/:patientId', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        await ex.models.Patient.findOne({ username: patientId }).then((data) => {
            res.send({ patientData: data, message: "patient retrieved" });
        });
    }
    catch (e) {
        console.log(e);
    }
})

router.post('/updateAppointments', async (req, res) => {
    try {
        console.log(req.body);
        const patientId = req.body.patientId;
        const appDate = req.body.AppointmentDate;
        const date = new Date(appDate).toISOString().split('T')[0];
        const docName = req.body.DoctorName;
        const newApp = new ex.models.Appointment({
            patientId: patientId,
            doctorName: docName,
            appointmentDate: date,
        });

        newApp.save();
        res.send({ message: 'appointment added' });
    }
    catch (e) {
        console.log(e);
        res.send({message : 'appointment could not be added'})
    }
})

router.get('/getAllAppointments/:date', async (req, res) => {
    try {
        const appDate = req.params.date;
        console.log(appDate);
        // Find appointments for the specified date
        const appointments = await ex.models.Appointment.find({ appointmentDate: appDate });

        // Fetch patient details for each appointment concurrently
        const promises = appointments.map(async (app) => {
            const patient = await ex.models.Patient.findOne({ username: app.patientId });
            return {
                appDate,
                patientId: app.patientId,
                patientContact: patient.contactNumber,
                patientName: patient.name,
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


router.post('/updateMedicines/:patientId', async (req, res) => {
    try{const id = req.params.patientId;
    const meds = req.body.newMedicines;
    const healthIssue = req.body.hIssue;

    meds.forEach(async (med) => {
        const newMed = new ex.models.Medicine({
            patientId : id,
            medName: med.medName,
            duration : med.duration,
            dosage : med.dosage,
            medTime : med.medTime
        });
        await newMed.save();
    })

    await ex.models.Patient.findOne({username : id}).then((p)=>{
        if(p == null)
        res.send({messaage : 'NO'})
        else
        {
        p.healthIssues.push(healthIssue);
        p.save();
        }
    });

    res.send({message : 'Updated'});}
    catch(e)
    {
        console.log(e);
        res.send({message : 'NO'});
    }
})

router.get('/getQueries', async (req,res)=>{
    try{await ex.models.Transcript.find().then((trans)=>{
        res.send(trans);
    })}
    catch(e)
    {
        console.log(e);
    }
})
export default router;