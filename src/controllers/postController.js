import postRepository from '../repository/postRepository.js';
import LogHelper from '../helpers/LogHelper.js';

const repo = new postRepository();

export const getAllPosts = async (req, res) => {
    try {
        const posts = await repo.getAllPostsAsync();
        
        if (!posts) {
            return res.status(500).json({ message: "Error al obtener las publicaciones." });
        }
        
        return res.status(200).json(posts);
    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await repo.getPostByIdAsync(id);
        
        if (!post) {
            return res.status(404).json({ message: "Publicación no encontrada." });
        }
        
        return res.status(200).json(post);
    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createPost = async (req, res) => {
    const { url_imagen, descripcion } = req.body;
    
    const usuario_id = req.user.id; 

    try {
        const nuevoPost = await repo.createPostAsync({
            usuario_id,
            url_imagen,
            descripcion
        });

        if (!nuevoPost) {
            return res.status(500).json({ message: "No se pudo crear la publicación." });
        }

        return res.status(201).json({ message: "Publicación creada con éxito", post: nuevoPost });
    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { url_imagen, descripcion } = req.body;
    const usuarioLogueadoId = req.user.id;

    try {
        const post = await repo.getPostByIdAsync(id);
        if (!post) {
            return res.status(404).json({ message: "Publicación no encontrada." });
        }

        if (parseInt(post.usuario_id) !== parseInt(usuarioLogueadoId)) {
            return res.status(403).json({ message: "No tienes permisos para editar esta publicación." });
        }

        const postActualizado = await repo.updatePostAsync(id, {
            url_imagen: url_imagen || post.url_imagen,
            descripcion: descripcion || post.descripcion
        });

        return res.status(200).json({ message: "Publicación actualizada con éxito", post: postActualizado });
    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const usuarioLogueadoId = req.user.id;

    try {
        const post = await repo.getPostByIdAsync(id);
        if (!post) {
            return res.status(404).json({ message: "Publicación no encontrada." });
        }

        if (parseInt(post.usuario_id) !== parseInt(usuarioLogueadoId)) {
            return res.status(403).json({ message: "No tienes permisos para eliminar esta publicación." });
        }

        const eliminado = await repo.deletePostAsync(id);
        if (!eliminado) {
            return res.status(500).json({ message: "No se pudo eliminar la publicación." });
        }

        return res.status(200).json({ message: "Publicación eliminada correctamente." });
    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getPostsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await repo.getPostsByUserIdAsync(userId);
        
        if (!posts) {
            return res.status(500).json({ message: "Error al obtener las publicaciones del usuario." });
        }
        
        return res.status(200).json(posts);
    } catch (error) {
        LogHelper.logError(error);
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};