const socket = io('ws://localhost:8080')

//Da mesma maneira que no server.js, os clientes utilizam a biblioteca socket.IO

//Ao receber uma mensagem do server, eles incorporam no html
socket.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)
})

//aqui o cliente pode mandar uma mensagem com emit
document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;

    socket.emit('message', text)
    
}