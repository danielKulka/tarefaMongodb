const mongoose = require("mongoose");

// modelo schema do usuario
const UsuarioSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  senha: {type: String, require: true}
});

const Usuario = mongoose.model("usuarios", UsuarioSchema);

module.exports = Usuario;