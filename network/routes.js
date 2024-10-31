const usuario = require('../components/usuario/interface')
//test
const materia = require('../components/materia/interface');
const auth = require('../components/auth/interface');

const routes = function( server ) {
    server.use('/usuario', usuario)
    server.use('/materia', materia);
    server.use('/auth', auth);
}

module.exports = routes