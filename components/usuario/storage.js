const model = require('./model')

async function insertar_usuario(dato) {
    const resultado = await new model(dato)
    return resultado.save()
}

async function obtener_usuario(dato) {
     let filter = {}

     if (dato.apellido) {
        filter = { apellido: dato.apellido }
     }
     
     const resultado = await model.find( filter )
     return resultado
}

async function eliminar_usuario(dato) {    
    let usuario = {}
    if (dato._id) {
       usuario = { _id: dato._id }
    }

    const busqueda = await model.find( usuario )
    if(busqueda.length == 0)
    {
        return {error: 'No existe id para eliminar'}
    }
    else{
        const resultado = await model.deleteOne(usuario)
        return resultado
    }
   
}

async function actualizar_usuario(id, data) {    
    if (id) {
        const result = await model.updateOne(
            { _id: id }, { $set: data }
        )
        if (result.acknowledged) {
            return {data: "Resgistro actualizado exitosamente"}
        }
    }else{
        return {error: 'No existe id para actualizar la información'}
    }
}

module.exports = {
    insertar:insertar_usuario,
    obtener:obtener_usuario,
    eliminar:eliminar_usuario,
    actualizar:actualizar_usuario
}