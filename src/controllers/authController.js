import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authRepository from '../repository/authRepository.js';
import LogHelper from '../helpers/LogHelper.js';

const repo = new authRepository();
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { nombre_usuario, nombre_completo, email, password, foto_perfil, biografia } = req.body;

    try {
        const existingEmail = await repo.getByEmailAsync(email);
        if (existingEmail) {
            return res.status(400).json({ message: "El email ya está registrado." });
        }
        const existingUsername = await repo.getByUsernameAsync(nombre_usuario);
        if (existingUsername) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const nuevoUsuario = await repo.createAsync({
            nombre_usuario,
            nombre_completo,
            email,
            password: hashedPassword,
            foto_perfil: foto_perfil || null,
            biografia: biografia || null
        });

        if (!nuevoUsuario) {
            return res.status(500).json({ message: "Error al crear el usuario." });
        }
        delete nuevoUsuario.password;
        return res.status(201).json({ message: "Usuario registrado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await repo.getByEmailAsync(email);
        if (!usuario) {
            return res.status(401).json({ message: "Email o contraseña incorrectos." });
        }
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email o contraseña incorrectos." });
        }
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, nombre_usuario: usuario.nombre_usuario },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
        return res.status(200).json({
            message: "Login exitoso",
            token: token
        });

    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};