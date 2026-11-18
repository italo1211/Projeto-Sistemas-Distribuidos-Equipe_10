//Criamos um servidor para receber dados
const http = require('http').createServer();

//Pensei em usar essa biblioteca socket.IO porque ela usa websockets de uma
//  maneira mais prática e consegue fazer broadcast no servidor.

const io = require('socket.io')(http, {
    cors: { origin: '*' }
});

// evento de nova conexão
io.on('connection', socket => {
    console.log('Um usuário se conectou.');
    // Aqui emite o estado atual do leilão, no futuro fazer ser segundo a segundo
    socket.emit('message', {item_leiloado: "Kriptonita", tempo: "100", lider: "Fulano", maior_lance: "150"});

})

http.listen(8080, () => console.log('listening on http://localhost:8080'));