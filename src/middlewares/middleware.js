export const validarRegistro = (req, res, next) => {
    const { nombre_usuario, nombre_completo, email, password } = req.body;

    if (!nombre_usuario || !nombre_usuario.trim()) {
        return res.status(400).json({ message: "El campo 'nombre_usuario' es obligatorio." });
    }
    if (!nombre_completo || !nombre_completo.trim()) {
        return res.status(400).json({ message: "El campo 'nombre_completo' es obligatorio." });
    }
    if (!email || !email.trim()) {
        return res.status(400).json({ message: "El campo 'email' es obligatorio." });
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ message: "El campo 'password' es obligatorio y debe tener al menos 6 caracteres." });
    }
    next();
};
export const validarPublicacion = (req, res, next) => {
    const { url_imagen, descripcion } = req.body;

    if (!url_imagen || !url_imagen.trim()) {
        return res.status(400).json({ message: "El campo 'url_imagen' es obligatorio para la publicación." });
    }
    if (!descripcion || !descripcion.trim()) {
        return res.status(400).json({ message: "El campo 'descripcion' es obligatorio para la publicación." });
    }

    next();
};