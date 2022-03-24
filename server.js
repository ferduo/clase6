const express = require("express");
const contenedor = require('./productos.js');
const app = express();
const PORT = 8080;

app.get('./productos', (req, res) => {
    contenedor.getAll().then(resp=>res.send(resp))
})

app.get('./productoRandom', (req, res)=>{
    container.getAll().then(resp=>res.send(
      resp[Math.floor(Math.random()*resp.length)]
    ))
  })

const server = app.listen(PORT, () => {
    console.log (`Servidor escuchando en el puerto ${server.address().port}`)
});
server.on ("error", error => console.log (`Error en servidor ${error}`))
