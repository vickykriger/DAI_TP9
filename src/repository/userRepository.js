import config from '../config/db.js';
import pkg from 'pg';
const { Client } = pkg;
import LogHelper from '../helpers/LogHelper.js';

export default class userRepository {

    getAllUsersAsync = async () => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT id, nombre_usuario, nombre_completo, email, foto_perfil, biografia FROM usuarios`;
            const result = await client.query(sql);
            await client.end();
            return result.rows;
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return null;
        }
    }

    updateUserAsync = async (id, usuario) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `UPDATE usuarios 
                         SET nombre_usuario = $1, nombre_completo = $2, email = $3, foto_perfil = $4, biografia = $5 
                         WHERE id = $6 
                         RETURNING id, nombre_usuario, nombre_completo, email, foto_perfil, biografia`;
            const values = [
                usuario.nombre_usuario,
                usuario.nombre_completo,
                usuario.email,
                usuario.foto_perfil,
                usuario.biografia,
                id
            ];
            const result = await client.query(sql, values);
            await client.end();
            return result.rows[0] || null;
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return null;
        }
    }

    deleteUserAsync = async (id) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `DELETE FROM usuarios WHERE id = $1 RETURNING id`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            return result.rowCount > 0;
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return false;
        }
    }
}