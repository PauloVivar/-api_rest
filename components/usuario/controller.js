const storage = require('./storage')

function insertar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato.nombre || !dato.apellido ) {
            reject( 'Los datos se encuentran incompletos.' )
        } else {
            resolve( storage.insertar( dato ) )
        }
    } )
}

function obtener_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato) {
            reject( 'No existen datos' )
        } else {
            resolve( storage.obtener( dato ) )
        }
    } )
}

function editar_usuario( id, data ) {
    return new Promise( (resolve, reject) => {
        if (!id) {
            reject('No existe el usuario que quiere actualizar')
        } else {
            resolve(storage.actualizar(id, data))
        }
    } ) 
}

function eliminar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato._id) {
            reject('No existe el usuario que quiere eliminar')
        } else {
            resolve(storage.eliminar(dato))
        }
    } )
}

module.exports = {
    insertar_usuario,
    obtener_usuario,
    eliminar_usuario,
    editar_usuario
}