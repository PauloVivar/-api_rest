// components/materia/interface.js
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Materia:
 *       type: object
 *       required:
 *         - codigo
 *         - nombre
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código único de la materia
 *         nombre:
 *           type: string
 *           description: Nombre de la materia
 *       example:
 *         codigo: "MAT101"
 *         nombre: "Matemáticas Básicas"
 */

/**
 * @swagger
 * /materia:
 *   get:
 *     summary: Obtiene todas las materias
 *     security:
 *       - bearerAuth: []
 *     tags: [Materias]
 *     responses:
 *       200:
 *         description: Lista de materias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 body:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Materia'
 *       401:
 *         description: No autorizado - Token inválido
 */
router.get('/', auth.verificarToken, function(req, res) {
    controller.obtenerMaterias(req.query)
        .then(data => response.success(req, res, data, 200))
        .catch(error => response.error(req, res, error, 400));
});

/**
 * @swagger
 * /materia:
 *   post:
 *     summary: Crea una nueva materia
 *     security:
 *       - bearerAuth: []
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Materia'
 *     responses:
 *       201:
 *         description: Materia creada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
router.post('/', [auth.verificarToken, auth.esAdmin], function(req, res) {
    controller.insertarMateria(req.body)
        .then(data => response.success(req, res, data, 201))
        .catch(error => response.error(req, res, error, 400));
});

/**
 * @swagger
 * /materia/{id}:
 *   put:
 *     summary: Actualiza una materia existente
 *     security:
 *       - bearerAuth: []
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la materia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Materia'
 *     responses:
 *       200:
 *         description: Materia actualizada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
router.put('/:id', [auth.verificarToken, auth.esAdmin], function(req, res) {
    controller.actualizarMateria(req.params.id, req.body)
        .then(data => response.success(req, res, data, 200))
        .catch(error => response.error(req, res, error, 400));
});

/**
 * @swagger
 * /materia/{id}:
 *   delete:
 *     summary: Elimina una materia
 *     security:
 *       - bearerAuth: []
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la materia
 *     responses:
 *       200:
 *         description: Materia eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 */
router.delete('/:id', [auth.verificarToken, auth.esAdmin], function(req, res) {
    controller.eliminarMateria(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(error => response.error(req, res, error, 400));
});

module.exports = router;