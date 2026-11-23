# Projeto Leilão Virtual - Sistema Distribuídos

Grupo 10

## Descrição do Projeto

O projeto consiste em um servidor que gerencia os estados de um leilão virtual. Além disso, o projeto também conta com uma interface gráfica web para representar os clientes conectados.

## Decisões tecnológicas

O projeto utiliza principalmente WebSockets implementados por meio da biblioteca Socket.IO. Nós decidimos utilizá-la pois ela permite trabalhar de modo mais prático e moderno com a tecnologia de WebSockets, permitindo a execução de broadcast por parte do servidor, por exemplo.

Essa escolha também se encaixa no leilão porque ele precisa de comunicação full-duplex: o cliente envia lances e o servidor envia atualizações para todos os clientes sem que eles precisem pedir.

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
O servidor roda na porta 8080. Depois, execute o arquivo index.html da pasta app.

## Estado atual do projeto
Por enquanto, o projeto já apresenta as regras de negócio entre os clientes e servidor, atualiza os clientes segundo a segundo com o estado do leilão e faz logs no terminal do servidor com os eventos que acontecem.<br>
No entanto, a mensagem de fim do leilão virã na próxima entrega junto com o histórico de lances dados e correção de bugs.

## Estado central e protocolos
O estado do leilão ficará armazenado na memória da máquina utilizada para rodar o servidor. Ele terá o item leiloado, o lance atual, o líder, o horário do fim do leilão, o status do leilão (aberto ou encerrado) e o histórico de lances.

Os dados serão mandados por meio de WebSockets coordenados pela biblioteca socket.IO, o payload máximo utilizado é de 1000000 bytes. As mensagens serão JSONs.

O cliente pode enviar os seguintes comandos ao servidor:
- BID "valor" para dar um lance
- status para saber se o leilão ainda está em andamento.

O leilão acontecerá de forma organizada com as seguintes regras de negócio:<br>
- Para dar um lance o cliente terá que digitar o valor na caixa de input e clicar no botão "Enviar lance"<br>
- Para se desconectar do leilão o cliente pode fechar a aba.<br>
- O cliente será atualizado de segundo a segundo com o lance atual e líder, histórico de lances (em desenvolvimento), tempo até o final (em segundos) e o item sendo leiloado. Sendo essas informações representadas na interface.
- O Servidor mostrará no terminal mensagens informativas sobre os eventos ocorridos no leilão.
- Os lances virão em ordem recebida (fila).
- O servidor enviará em broadcast o estado atual do leilão aos clientes de segundo a segundo.
- O lance recebido pelo servidor só será aceito caso seja maior que o maior lance atual armazenado nele.
- Ao fim do leilão o servidor enviará em broadcast o vencedor. (em desenvolvimento)

## Regras de validação
Um lance só será aceito se o valor tiver sido informado e for um número, se o leilão ainda estiver aberto e se o valor for maior que o maior lance atual. Se alguma dessas regras falhar, o servidor responde com um erro para o cliente e o estado do leilão não muda.

## Sincronização e desempate
Os lances serão processados em ordem de chegada ao servidor (fila), um de cada vez: o servidor termina de tratar um lance antes de começar o próximo. O Node.js trata os eventos em uma única thread, o que ajuda a garantir isso.

Em caso de empate (dois lances com o mesmo valor), vale o primeiro que o servidor processar. O segundo é recusado, porque o lance precisa ser maior que o lance atual.
