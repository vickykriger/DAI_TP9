import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repository/userRepository.js';
import LogHelper from '../helpers/LogHelper.js';

const repo = new userRepository();
const JWT_SECRET = process.env.JWT_SECRET;

export const getAllUsers = async (req, res) => {
    try {
        const usuarios = await repo.getAllUsersAsync();
        if (!usuarios) {
            return res.status(500).json({ message: "Error al obtener los usuarios." });
        }
        
        return res.status(200).json(usuarios);
    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params; 
    const { nombre_usuario, nombre_completo, email, foto_perfil, biografia } = req.body;

    try {
        if (parseInt(req.user.id) !== parseInt(id)) {
            return res.status(403).json({ message: "No tienes permisos para modificar este perfil." });
        }

        const usuarioActualizado = await repo.updateUserAsync(id, {
            nombre_usuario,
            nombre_completo,
            email,
            foto_perfil: foto_perfil || null,
            biografia: biografia || null
        });

        if (!usuarioActualizado) {
            return res.status(404).json({ message: "Usuario no encontrado o no se pudo actualizar." });
        }

        return res.status(200).json({ 
            message: "Perfil actualizado con éxito", 
            usuario: usuarioActualizado 
        });

    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (parseInt(req.user.id) !== parseInt(id)) {
            return res.status(403).json({ message: "No tienes permisos para eliminar esta cuenta." });
        }

        const eliminado = await repo.deleteUserAsync(id);

        if (!eliminado) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        return res.status(200).json({ message: "Cuenta eliminada correctamente." });

    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};