const mongoose = require('mongoose');
const schema = mongoose.Schema;

const materia_schema = new schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha_registro: Date,
    fecha_actualizacion: Date,
}, {
    timestamps: { createdAt: 'fecha_registro', updatedAt: 'fecha_actualizacion' }
});

const model = mongoose.model('Materia', materia_schema);
module.exports = model;