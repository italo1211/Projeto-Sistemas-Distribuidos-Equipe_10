# Projeto Leilão Virtual - Sistema Distribuídos

Grupo 10

## Descrição do Projeto

O projeto consiste em um servidor que gerencia os estados de um leilão virtual. Além disso, o projeto também conta com uma interface gráfica web para representar os clientes conectados.

## Decisões tecnológicas

O projeto utiliza principalmente WebSockets implementados por meio da biblioteca Socket.IO. Nós decidimos utilizá-la pois
ela permite trabalhar de modo mais prático e moderno com a tecnologia de WebSockets, permitindo a execução de broadcast por parte do servidor, por exemplo.

## Estrutura do repositório
```bash
/Projeto-Sistemas-Distribuidos-Equipe_10
├── /app                       # Front-End + Cliente
│   ├── app.js                 # Script do cliente
│   └── index.html             # HTML que mostra a interface gráfica
├── /server                    # Back-End
│   ├── server.js              # Servidor que gerencia o leilão
│   └── package.json           # Lista as dependências do projeto
└── README.md
```
## Instruções para rodar o projeto
Primeiramente certifique-se que tem o node.js instalado

Após isso, execute os seguintes comandos no terminal:
```bash
cd server
npm install
node server.js
```
Depois, execute o arquivo index.html da pasta app.

## Estado central e protocolos
As mensagens (JSONs) trocadas entre o server.js e os clientes ficaram armazenadas na memória da máquina utilizada para rodar o processo, sendo deletada ao término da conexão.

Os dados serão mandados por meio de WebSockets coordenados pela biblioteca socket.IO, o payload máximo utilizado é de 1000000 bytes.

O leilão acontecerá de forma organizada com as seguintes regras de negócio:<br>
- Para dar um lance o cliente terá que digitar o valor na caixa de input e clicar no botão "Enviar lance"<br>
- Para se desconectar do leilão o cliente pode clicar no botão "Desconectar-se" ou fechar a aba.<br>
- O cliente será atualizado de segundo a segundo com o lance atual e líder, histórico de lances, tempo até o final (em segundos) e o item sendo leiloado. Sendo essas informações representadas na interface.
- O Servidor mostrará no terminal mensagens informativas sobre os eventos ocorridos no leilão.
- Os lances virão em ordem recebida (fila).
- O servidor enviará em broadcast o estado atual do leilão aos clientes de segundo a segundo.
- O lance recebido pelo servidor só será aceito caso seja maior que o maior lance atual armazenado nele.
- Ao fim do leilão o servidor envia em broadcast o vencedor.
