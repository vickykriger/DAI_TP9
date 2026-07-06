import { Router } from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, getPostsByUserId } from '../controllers/postController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validarPublicacion } from '../middlewares/middleware.js'; 

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/usuario/:userId', getPostsByUserId);

router.post('/', authMiddleware, validarPublicacion, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;