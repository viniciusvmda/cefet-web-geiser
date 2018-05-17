const fs = require('fs');
const express = require('express'),
    app = express();

let db = {};
let dbJogadores = {}
let dbJogos = {}

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 3-4 linhas de código (você deve usar o módulo de filesystem (fs))
fs.readFile('server/data/jogadores.json', 'utf8', (err, data) => {
  dbJogadores = JSON.parse(data);
});

fs.readFile('server/data/jogosPorJogador.json', 'utf8', (err, data) => {
  dbJogos = JSON.parse(data);
});

// configurar qual templating engine usar. Sugestão: hbs (handlebars)
app.set('view engine', 'hbs');
app.set('views', 'server/views');

// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json
app.get('/', (req, res) => {
  res.render('index', dbJogadores);
});

// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter umas 15 linhas de código


// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static(`${__dirname}/client`));

// abrir servidor na porta 3000
// dica: 1-3 linhas de código
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening at http://${host}:${port}`);
});
