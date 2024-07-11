// import {updateUser, deleteUser, singleUser, allUsers} from './userController.js';
import express from 'express';
import { authenticate, restrict } from './verifyToken.js'
import path from 'path';
import ex from './models.js';
const router = express.Router();
import multer from 'multer';
// router.get('/:id' ,authenticate,restrict(['Patient']), singleUser);
// router.get('/', allUsers);
// router.put('/:id', authenticate,restrict(['Patient']),updateUser);
// router.delete('/:id', authenticate,restrict(['Patient']),deleteUser);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
});

const upload = multer({ storage: storage })

router.post('/uploadDoc/:patientId', upload.array('file'), async (req, res) => {
    try {
        const id = req.params.patientId;
        const file = req.body;
        const uniqueSuffix = Date.now();
        const title = uniqueSuffix+req.body.title;

        await ex.models.Patient.findOne({username : id}).then((p)=>{
            p.medicalRecords.push(title);
            p.save();
        });
        
        res.send({ message: "uploaded" })
    }
    catch (error) {
        console.error('Error finding employer:', error);
    }
});

router.post('/transUpload/:patientId', async (req,res)=>{
    console.log(req.body.transcript);
    const message = req.body.transcript;
    const id = req.params.patientId;
    await ex.models.Patient.findOne({username : id}).then(async (p)=>{
        const healthIssues = p.healthIssues;
        await ex.models.Appointment.findOne({patientId : id}).then((app)=>{
            console.log(app)
            const nt = new ex.models.Transcript({
                patientId : id,
                healthIssues : healthIssues,
                message : message,
                doctorName : app.doctorName
            });
            nt.save();
        })
    })
    
})


// Existing Express app code...

router.get('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'files', filename); // Assuming files are in the 'files' folder
  
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching file');
        return;
      }
  
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    });
  });
  


export default router;