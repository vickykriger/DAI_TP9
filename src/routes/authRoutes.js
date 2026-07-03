import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validarRegistro } from '../middlewares/middleware.js';
const router = Router();

router.post('/register', validarRegistro, register);

router.post('/login', login);

export default router;