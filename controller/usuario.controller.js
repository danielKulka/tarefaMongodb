//importando o service
const usuarioService = require("../service/usuario.service");
const mongoose = require("mongoose");

const find = async (req,res) => {
  try{
    const id = new mongoose.Types.ObjectId(req.params.id);
    let found = false;
    
    const usuario = await usuarioService.findByIdUsuario(id);
    
    if(usuario != null){
      found= true;
    }

    if(!found){
      return res.status(404).send({message: "usuario não encontrado, tente outro id"});
    }

    return res.status(200).send(usuario);

  }catch(err){
    console.log(`erro: ${err}`);
    return res.status(500).send("erro no servidor, tente novamente mais tarde");
  }
}

const findAllUsuarios = async (req,res) => {
  return res.status(200).send(await usuarioService.findAllUsuarios());
}

const createUsuario = async (req,res) => {
  const usuario = req.body;
  if(Object.keys(usuario).length === 0){
    return res.status(400).send({message:"o corpo da mensagem está vazio"});
  }

  if(!usuario.nome){
    return res.status(400).send({message:"campo 'nome' não encontrado!"});
  }

  if(!usuario.email){
    return res.status(400).send({message:"campo 'email' não encontrado!"});
  }

  if(!usuario.senha){
    return res.status(400).send({message:"campo 'senha' não encontrado!"});
  }

  return res.status(201).send(await usuarioService.createUsuario(usuario));
}

const updateUsuario = async (req,res) => {
  const id = req.params.id;
  const usuario = req.body;
  //let found = false;

  if(Object.keys(usuario).length === 0){
    return res.status(400).send({message:"o corpo da mensagem está vazio"});
  }

  if(!usuario.nome){
    return res.status(400).send({message:"campo 'nome' não encontrado!"});
  }

  if(!usuario.email){
    return res.status(400).send({message:"campo 'email' não encontrado!"});
  }

  if(!usuario.senha){
    return res.status(400).send({message:"campo 'senha' não encontrado!"});
  }
  
  return res.status(200).send(await usuarioService.updateUsuario(id,usuario));

  /* if(!found){
    res.status(404).send({message: "usuario não encontrado"})
  } */
}

const deleteUsuario = async (req,res) => {
  const id = req.params.id;
  //let found = false;

  return res.status(200).send(await usuarioService.deleteUsuario(id));
  
  /* if(!found){
    res.status(404).send({message: "usuario não encontrado"})
  } */
}

module.exports = {
  find,
  findAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
}