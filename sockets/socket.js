const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band("Queen"));
bands.addBand( new Band("Bon Jovi"));
bands.addBand( new Band("Auntenticos"));
bands.addBand( new Band("metalica"));



//Mensajes de sockets
io.on('connection', client => {
    console.log("cliente conectado");
    
    //emitir un mensaje unicamente a cliente que se conecta de las bandas activas
    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => { console.log("cliente desconectado"); });


    client.on('mensaje', (payload) => {
        console.log('Mensjjae!!', payload.nombre);

        io.emit('mensaje', { admin: "Olita" });
    });

    client.on('vote-band',(payload) => {
        // console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band',(payload) => {
        // console.log(payload);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('del-band',(payload) => {
        console.log(payload);
        bands.deletBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


    // client.on('nuevo-mensaje',(payload) => {
    //     io.emit("nuevo-mensaje", payload);
    //     console.log(payload);
    // })

});