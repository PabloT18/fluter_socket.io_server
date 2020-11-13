const express = require('express');
const { platform } = require('os');
const path = require('path');

//leer el archivo .env y estable la configruacion 
require('dotenv').config();

//App de express
const app = express();


///Sockets
//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);


require("./sockets/socket");

///

//Path publico
const publicPath = path.resolve(__dirname, 'public');


app.use(express.static(publicPath));




// app.listen(3000, (err )=> {
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log("Servidor corriendo en puerto", process.env.PORT);
});