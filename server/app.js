const fs = require('fs');
const express = require('express'),
    app = express();

let dbJogadores = {}
let dbJogos = {}

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 3-4 linhas de código (você deve usar o módulo de filesystem (fs))
let arq1 = fs.readFileSync('server/data/jogadores.json', 'utf8');
jogadores = JSON.parse(arq1);

let arq2 = fs.readFileSync('server/data/jogosPorJogador.json', 'utf8');
jogosPorJogador = JSON.parse(arq2);

let db = {
  jogadores,
  jogosPorJogador
};

// configurar qual templating engine usar. Sugestão: hbs (handlebars)
app.set('view engine', 'hbs');
app.set('views', 'server/views');

// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json
app.get('/', (req, res) => {
  res.render('index', db.jogadores);
});

// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter umas 15 linhas de código
app.get('/:jogador_id', function (req, res) {
    // Pega o jogador no banco
    let jogadorId = req.params.jogador_id;
    let jogador = null;
    for (let p of db.jogadores.players) {
      if (p.steamid == jogadorId) {
        jogador = p;
        break;
      }
    }

    if (jogador == null) {
      alert('Jogador não encontrado');
      res.redirect('index');
    }

    // Pega os jogos do jogador no banco
    let jogos = db.jogosPorJogador[jogadorId].games;
    jogos.sort(function compare(a,b) {
        return b.playtime_forever - a.playtime_forever
    });
    // Pega os status
    let nuncaJogado = 0
    for (let jogo of jogos) {
        if (jogo.playtime_forever == 0){
            nuncaJogado++;
        }
    }
    // Renderiza
    res.render('jogador', { 'jogador': jogador, 'qtd':jogos.length, 'nuncaJogado': nuncaJogado, 'maisJogado':jogos[0], 'top5':jogos.slice(0, 5)});
});

// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static(__dirname + '/../client'));

// abrir servidor na porta 3000
// dica: 1-3 linhas de código
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening at http://${host}:${port}`);
});
