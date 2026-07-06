import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js';
import postRoutes from './src/routes/postRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);  
app.use('/api/posts', postRoutes); 

app.get('/', (req, res) => {
    res.status(200).json({ message: "Servidor corriendo con éxito y listo para Postman 🚀" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});