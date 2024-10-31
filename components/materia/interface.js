const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

// Obtener materias - accesible para todos los usuarios autenticados
router.get('/', auth.verificarToken, function(req, res) {
    controller.obtenerMaterias(req.query)
        .then(data => response.success(req, res, data, 200))
        .catch(error => response.error(req, res, error, 400));
});

// Crear materia - solo admin
router.post('/', [auth.verificarToken, auth.esAdmin], function(req, res) {
    controller.insertarMateria(req.body)
        .then(data => response.success(req, res, data, 201))
        .catch(error => response.error(req, res, error, 400));
});

// Actualizar materia - solo admin
router.put('/:id', [auth.verificarToken, auth.esAdmin], function(req, res) {
    controller.actualizarMateria(req.params.id, req.body)
        .then(data => response.success(req, res, data, 200))
        .catch(error => response.error(req, res, error, 400));
});

// Eliminar materia - solo admin
router.delete('/:id', [auth.verificarToken, auth.esAdmin], function(req, res) {
    controller.eliminarMateria(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(error => response.error(req, res, error, 400));
});

module.exports = router;