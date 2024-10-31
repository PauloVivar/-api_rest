const storage = require('./storage');

function insertarMateria(dato) {
    return new Promise((resolve, reject) => {
        if (!dato.codigo || !dato.nombre) {
            reject('Los datos son incompletos');
            return;
        }
        resolve(storage.insertar(dato));
    });
}

function obtenerMaterias(filtro = {}) {
    return new Promise((resolve, reject) => {
        resolve(storage.obtener(filtro));
    });
}

function actualizarMateria(id, dato) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Id inválido');
            return;
        }
        resolve(storage.actualizar(id, dato));
    });
}

function eliminarMateria(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Id inválido');
            return;
        }
        resolve(storage.eliminar(id));
    });
}

module.exports = {
    insertarMateria,
    obtenerMaterias,
    actualizarMateria,
    eliminarMateria
};