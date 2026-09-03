// 1. Importar Mongoose
const mongoose = require('mongoose');

// 2. Schema del usuario
const usuarioSchema = new mongoose.Schema({
  nnombre:   { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },   // ← coma aquí
  rol:      { type: String,
             enum: ['admin', 'cliente'],
             default: 'cliente' }               // ← AGREGAR S15
});
// 3. Exportar el Model

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
