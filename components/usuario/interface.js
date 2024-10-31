const express = require('express')

const controller = require('./controller')
const response = require('../../network/response')
//test
const auth = require('../../middleware/auth');

const routes = express.Router()

// Solo administradores pueden crear usuarios
routes.post('/', [auth.verificarToken, auth.esAdmin], function(req, res) {
    controller.insertar_usuario( req.body )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

// Obtener usuarios - requiere autenticación
routes.get('/', auth.verificarToken, function(req, res) {
    controller.obtener_usuario( req.body )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

// Solo administradores pueden actualizar usuarios
routes.put('/:id', [auth.verificarToken, auth.esAdmin], function(req, res) {
    controller.editar_usuario( req.params.id, req.body)
    .then( (data) => response.success(req, res, data, 200) )
    .catch( (error) => response.error(req, res, error, 400) )
})

// Solo administradores pueden eliminar usuarios
routes.delete('/', [auth.verificarToken, auth.esAdmin], function(req, res) {
    controller.eliminar_usuario( req.body )
    .then( (data) => response.success(req, res, data, 200) )
    .catch( (error) => response.error(req, res, error, 400) )
})

module.exports = routes