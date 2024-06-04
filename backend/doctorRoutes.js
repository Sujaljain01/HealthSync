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

export default router;