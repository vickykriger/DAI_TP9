import config from '../config/db';
import pkg from 'pg';
const { Client } = pkg;

export default class authRepository {
    getByEmailAsync = async (email) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM usuarios WHERE email = $1`;
            const values = [email];
            const result = await client.query(sql, values);
            await client.end();
            return result.rows[0] || null;
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return null;
        }
    }
    getByIdAsync = async (id) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM usuarios WHERE id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            return result.rows[0] || null;
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return null;
        }
    }
    createAsync = async (usuario) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `INSERT INTO usuarios (nombre_usuario, nombre_completo, email, password, foto_perfil, biografia) 
                     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values = [
                usuario.nombre_usuario,
                usuario.nombre_completo,
                usuario.email,
                usuario.password,
                usuario.foto_perfil,
                usuario.biografia
            ];
            const result = await client.query(sql, values);
            await client.end();
            return result.rows[0];
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return null;
        }
    }
    getByUsernameAsync = async (nombre_usuario) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM usuarios WHERE nombre_usuario = $1`;
            const values = [nombre_usuario];
            const result = await client.query(sql, values);
            await client.end();
            return result.rows[0] || null;
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return null;
        }
    }
    getByUsernameAsync = async (nombre_usuario) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM usuarios WHERE nombre_usuario = $1`;
            const values = [nombre_usuario];
            const result = await client.query(sql, values);
            await client.end();
            return result.rows[0] || null;
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return null;
        }
    }
}