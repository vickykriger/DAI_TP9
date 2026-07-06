import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; 

const router = Router();

router.get('/', getAllUsers);

router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;