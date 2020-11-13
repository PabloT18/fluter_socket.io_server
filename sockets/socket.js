const {io} = require('../index')

//Mensajes de sockets
io.on('connection', client => {
    console.log("cliente conectado");
    // client.on('event', data =>{/*...*/});
    client.on('disconnect', () => { console.log("cliente desconectado"); });


    client.on('mensaje', (payload) => {
        console.log('Mensjjae!!', payload.nombre);

        io.emit('mensaje', { admin: "Olita" });
    });

});