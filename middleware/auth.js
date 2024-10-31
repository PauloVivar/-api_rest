const jwt = require('jsonwebtoken');
const config = require('../config');

const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            return res.status(403).send({
                error: 'No se proporcionó token de autorización',
                body: ''
            });
        }

        const tokenParts = authHeader.split(' ');
        
        if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
            return res.status(401).send({
                error: 'Formato de token inválido',
                body: ''
            });
        }

        const token = tokenParts[1];
        const decoded = jwt.verify(token, config.JWT_SECRET);
        
        req.usuario = decoded;
        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.status(401).send({
            error: 'Token inválido',
            body: ''
        });
    }
};

const esAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'admin') {
        next();
        return;
    }

    res.status(403).send({
        error: 'Requiere rol de Administrador',
        body: ''
    });
};

module.exports = {
    verificarToken,
    esAdmin
};