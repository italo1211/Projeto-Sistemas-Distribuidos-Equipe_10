const socket = io('ws://localhost:8080')

//Da mesma maneira que no server.js, os clientes utilizam a biblioteca socket.IO


//Aqui o código pega os elementos do html para mudar o texto deles depois
user = document.getElementById("user");
leader = document.getElementById("lider");
time = document.getElementById("tempo");
bid = document.getElementById("maior_lance");
item = document.getElementById("item");

server_message = document.getElementById("server_message");

//fica esperando novas atualizações do server e muda o texto do html
socket.on('update', msg => {

    leader.textContent = msg.lider
    time.textContent = msg.tempo
    bid.textContent = msg.maior_lance
    item.textContent = msg.item_leiloado
    
})

//fica esperando o feedback do server sobre o comando mandado
socket.on('response', response => {
    server_message.textContent = response
})

socket.on('id', user_id => {
    user.textContent = user_id;
});

//Aqui ele manda o comando (texto dentro da caixa de texto do html) para o servidor quando o botão "Enviar Comando" é apertado
document.querySelector('button').onclick = () => {

    const comando = document.querySelector('input').value;

    socket.emit('comando', comando)
    
}