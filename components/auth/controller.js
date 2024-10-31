const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../usuario/model');
const config = require('../../config');

async function login(email, password) {
    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        throw 'Usuario no encontrado';
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
        throw 'Contraseña inválida';
    }

    // Crear token
    const token = jwt.sign({
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
        nombre: usuario.nombre
    }, config.JWT_SECRET, {
        expiresIn: '24h'
    });

    return {
        usuario: {
            id: usuario._id,
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            rol: usuario.rol
        },
        token
    };
}

async function registro(datos) {
    // Verificar si el email ya existe
    const existeEmail = await Usuario.findOne({ email: datos.email });
    if (existeEmail) {
        throw 'El email ya está registrado';
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(datos.password, salt);

    // Crear nuevo usuario
    const usuario = new Usuario({
        nombre: datos.nombre,
        apellido: datos.apellido,
        email: datos.email,
        password: passwordHash,
        rol: datos.rol || 'usuario'
    });

    await usuario.save();

    // Generar token
    const token = jwt.sign({
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
        nombre: usuario.nombre
    }, config.JWT_SECRET, {
        expiresIn: '24h'
    });

    return {
        usuario: {
            id: usuario._id,
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            rol: usuario.rol
        },
        token
    };
}

module.exports = {
    login,
    registro
};