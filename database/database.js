//importando mongoose 
const mongoose = require("mongoose");

//função para conectar ao database
function conectTodatabase(){
  mongoose.connect("mongodb://localhost:27017/aulas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("MONGO DB CONECTADO!");
  }).catch((err)=>{
    return console.log(`Erro na conexão com o banco: ${err}`);
  })
}
//se a função funcionar cai no then, senão catch

//exportando a conexão
module.exports = conectTodatabase;