const express = require("express");
const app = express();
const usuario = require(".//router/usuario.router");
const authService = require("./service/auth.service");
const conectTodatabase = require("./database/database");
const jwt = require("jsonwebtoken");
const { schema } = require("./model/usuario");

//importando a conexão com database
conectTodatabase();

const port = 3001;
const segredo = "649440a71d988570e3120aa0";

app.use(express.json());

app.use("/usuario",usuario);

app.get("/", (req,res) =>{
  res.send("hello world");
});

app.post("/login", async (req,res) => {
  try{
    //deconstrução de objeto
    const {email, senha} = req.body;
    const user = await authService.loginService(email);

    if(!user){
      return res.status(400).send({message:"Usuario não encontrado, tente novamente"});
    }

    if(senha != user.senha){
      return res.status(400).send({message:"Senha inválida"});
    }

    const token = authService.generateToken(user, segredo);
    return res.status(200).send({
      user,
      token
    });

  }catch(err) {
    console.log(`erro:${err}`);
  }
});

app.get("/validar" , (req,res) => {
  try{
    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).send({ message: "O token não foi informado!"});
    }

    const parts = authHeader.split(" ");

    if(parts.length !== 2){
      return res.status(401).send({ message: "Token inválido!"});
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
      return res.status(401).send({ message: "Token malformatado!"});
    }

    jwt.verify(token, segredo, (err, decoded) => {
      
      if(err){
        console.log(`erro: ${err}`);
        return res.status(500).send({message: `erro interno, tente novamente`});
      }
      return res.send(decoded);
    });
  }catch{
    console.log(`erro:${err}`);
  }
});

app.get("/contato", (req,res) =>{
  res.send("nosso email: email@123.com");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
});