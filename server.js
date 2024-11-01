const express = require('express');
const body_parser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

const config = require('./config');
const db = require('./db');
const routes = require('./network/routes');

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use('/', express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes(app);

app.listen(config.PORT);
console.log(`La aplicación se encuentra arriba en http://localhost:${config.PORT}/`);