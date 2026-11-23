//Criamos um servidor para receber dados
const http = require('http').createServer();

//Pensei em usar essa biblioteca socket.IO porque ela usa websockets de uma
//  maneira mais prática e consegue fazer broadcast no servidor.


//Objeto com as informações do leilão
let estado = {item_leiloado: "iPhone Duo", tempo: 60, lider: "Lance Inicial", maior_lance: "1500", acabou: false}

function atualizar_clientes(estado, socket) {
    socket.emit('update', estado)
}

function atualizar_tempo(estado){
    if (estado.tempo > 0){
        estado.tempo -= 1
    }
}

//Usado para decrementar o tempo de leilão a cada segundo passado.
setInterval(atualizar_tempo, 1000, estado);

const io = require('socket.io')(http, {
    cors: { origin: '*' }
});

// evento de nova conexão
io.on('connection', socket => {
    console.log(`O usuário ${socket.id} se conectou.`);
    socket.emit('id', socket.id)
    //Aqui o server fica escutando pelo evento "comando" lançado por um cliente, onde o comando pode ser o BID
    //que tenta estabelecer um novo lance ou status que mostra o status atual do leilão (talvez rever o uso do status
    //já que a gente atualiza segundo a segundo já.)
    // o evento "response" emitido aqui retorna o feedback ao cliente
    socket.on('comando', comando => {
    if(estado.tempo>0){ //if que ignora comandos que forem feitos após o encerramento do leilao
        //provavelmente a condicao mudará se quisermos consultar quem arrematou o item após o termino

        if (comando.toUpperCase().startsWith("BID")){//caso seja digitado em maiuscula ou minuuscula, o comando será reconhecido
            let valor = comando.slice(4);
            valor = Number(valor);
            if (valor > estado.maior_lance) {
                estado.maior_lance = valor;
                socket.emit('response', "O valor é maior que o lance do lider atual! Você é o líder do leilão!");
                estado.lider = socket.id;
                console.log(`O usuário ${socket.id} deu o maior lance! Lance atualizado para ${estado.maior_lance}`)
            } 
            else{
                socket.emit('response', "O valor não é maior que o lance do lider atual.")
                console.log(`O usuário ${socket.id} deu um lance de ${valor} que é menor que o maior de ${estado.maior_lance}.`)
            }
        
        }
        else if (comando.toLowerCase() === 'status'){ //agora mesmo que o comando seja digitado com letras maiusculas e minusculas, ele será reconhecido
                socket.emit('response', `O leilão está em andamento! Maior lance: ${estado.maior_lance}`)
                console.log(`O usuário ${socket.id} pediu o status do leilão.`)
        }
        else {
            socket.emit('response', "Comando não reconhecido.")
            console.log(`O usuário ${socket.id} enviou um comando desconhecido.`)
        }
    }
    else{
        socket.emit('response', "O leilão já chegou ao fim.")
    }
})
    //Isso aqui fica repetindo de segundo a segundo e emite o estado do leilão aos clientes, uma vez que chama a função atualizar clientes lá em cima.
    //emite o evento "update" que manda o estado atualizado do leilão.
    setInterval(atualizar_clientes, 1000, estado, socket);
})

http.listen(8080, () => console.log('listening on http://localhost:8080'));