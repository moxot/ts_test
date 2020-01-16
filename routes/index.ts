import express from 'express';
 
import { users } from '../controllers';

const router: express.Router = express.Router();
 
router.get('/users/generate', users.generateUser);
router.get('/users', users.getUsers);
router.put('/users/:userId', users.updateUser);
router.delete('/users/:userId', users.deleteUser);
router.post('/users/login', users.loginUser);

export default router;