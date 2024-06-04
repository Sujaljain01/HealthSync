// import {updateUser, deleteUser, singleUser, allUsers} from './userController.js';
import express from 'express';
import { authenticate, restrict } from './verifyToken.js'
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


export default router;