const socket = io('ws://localhost:8080')

//Da mesma maneira que no server.js, os clientes utilizam a biblioteca socket.IO

leader = document.getElementById("lider");
time = document.getElementById("tempo");
bid = document.getElementById("maior_lance");
item = document.getElementById("item");

socket.on('message', msg => {

    leader.textContent = msg.lider
    time.textContent = msg.tempo
    bid.textContent = msg.maior_lance
    item.textContent = msg.item_leiloado
    
})

//aqui ainda falta implementar o sistema de lance
document.querySelector('button').onclick = () => {

    const msg = document.querySelector('input').value;

    socket.emit('message', msg)
    
}