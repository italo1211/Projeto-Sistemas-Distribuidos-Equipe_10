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

    //evento de recebimento de mensagem do cliente, nesse caso de teste, ele faz um broadcast para tds os clientes
    // conectados, utilizando emit.
    socket.on('message', message => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} disse: ${message}` );
    })
})

http.listen(8080, () => console.log('listening on http://localhost:8080'));