// import {updateUser, deleteUser, singleUser, allUsers} from './userController.js';
import express from 'express';
import {authenticate, restrict} from './verifyToken.js'
import ex from './models.js';
const router = express.Router();

// router.get('/:id' ,authenticate,restrict(['Patient']), singleUser);
// router.get('/', allUsers);
// router.put('/:id', authenticate,restrict(['Patient']),updateUser);
// router.delete('/:id', authenticate,restrict(['Patient']),deleteUser);



export default router;