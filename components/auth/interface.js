const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/login', async function(req, res) {
    try {
        const { email, password } = req.body;
        const data = await controller.login(email, password);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, error, 400);
    }
});

router.post('/registro', async function(req, res) {
    try {
        const data = await controller.registro(req.body);
        response.success(req, res, data, 201);
    } catch (error) {
        response.error(req, res, error, 400);
    }
});

module.exports = router;