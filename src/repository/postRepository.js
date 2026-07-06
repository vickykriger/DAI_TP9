import config from '../config/db.js';
import pkg from 'pg';
const { Client } = pkg;
import LogHelper from '../helpers/LogHelper.js';

export default class postRepository {
    getAllPostsAsync = async () => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT id, usuario_id, url_imagen, descripcion, likes, fecha_creacion 
                         FROM publicaciones 
                         ORDER BY fecha_creacion DESC`;
            const result = await client.query(sql);
            await client.end();
            return result.rows;
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return null;
        }
    }

    getPostByIdAsync = async (id) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT id, usuario_id, url_imagen, descripcion, likes, fecha_creacion 
                         FROM publicaciones 
                         WHERE id = $1`;
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
    createPostAsync = async (publicacion) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `INSERT INTO publicaciones (usuario_id, url_imagen, descripcion, likes, fecha_creacion) 
                         VALUES ($1, $2, $3, 0, NOW()) 
                         RETURNING id, usuario_id, url_imagen, descripcion, likes, fecha_creacion`;
            const values = [
                publicacion.usuario_id,
                publicacion.url_imagen,
                publicacion.descripcion
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

    updatePostAsync = async (id, publicacion) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `UPDATE publicaciones 
                         SET url_imagen = $1, descripcion = $2 
                         WHERE id = $3 
                         RETURNING id, usuario_id, url_imagen, descripcion, likes, fecha_creacion`;
            const values = [
                publicacion.url_imagen,
                publicacion.descripcion,
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

    deletePostAsync = async (id) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `DELETE FROM publicaciones WHERE id = $1 RETURNING id`;
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

    getPostsByUserIdAsync = async (usuario_id) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT id, usuario_id, url_imagen, descripcion, likes, fecha_creacion 
                         FROM publicaciones 
                         WHERE usuario_id = $1 
                         ORDER BY fecha_creacion DESC`;
            const values = [usuario_id];
            const result = await client.query(sql, values);
            await client.end();
            return result.rows;
        } catch (error) {
            LogHelper.logError(error);
            console.log(error);
            return null;
        }
    }
}