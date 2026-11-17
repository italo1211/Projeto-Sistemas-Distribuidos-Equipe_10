# Projeto Leilão Virtual - Sistema Distribuídos

Grupo 10

## Descrição do Projeto

O projeto consiste em um servidor que gerencia os estados de um leilão virtual. Além disso, o projeto também conta com uma interface gráfica web para representar os clientes conectados.

## Decisões tecnológicas

O projeto utiliza principalmente WebSockets implementados por meio da biblioteca Socket.IO. Nós decidimos utilizá-la pois
ela permite trabalhar de modo mais prático e moderno com a tecnologia de WebSockets, permitindo a execução de broadcast por parte do servidor, por exemplo.

## Estrutura do repositório

/Projeto-Sistemas-Distribuidos-Equipe_10
├── /app                       # Front-End + Cliente
│   ├── app.js                 # Script do cliente
│   └── index.html             # HTML que mostra a interface gráfica
├── /server                    # Back-End
│   ├── server.js              # Servidor que gerencia o leilão
│   └── package.json           # Lista as dependências do projeto
└── README.md

## Instruções para rodar o projeto
