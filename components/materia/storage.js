const model = require('./model');

async function insertarMateria(dato) {
    const materia = await new model(dato);
    return materia.save();
}

async function obtenerMaterias(filtro = {}) {
    return model.find(filtro);
}

async function actualizarMateria(id, dato) {
    if (!id) {
        return { error: 'No existe id para actualizar la información' };
    }
    
    const result = await model.updateOne(
        { _id: id },
        { $set: dato }
    );
    
    if (result.acknowledged) {
        return { data: "Registro actualizado exitosamente" };
    }
    return { error: 'Error al actualizar' };
}

async function eliminarMateria(id) {
    if (!id) {
        return { error: 'No existe id para eliminar' };
    }
    
    const existe = await model.findById(id);
    if (!existe) {
        return { error: 'No existe la materia a eliminar' };
    }
    
    return model.deleteOne({ _id: id });
}

module.exports = {
    insertar: insertarMateria,
    obtener: obtenerMaterias,
    actualizar: actualizarMateria,
    eliminar: eliminarMateria
};