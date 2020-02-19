const express = require('express');
const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

//BD
const Pool = require('pg').Pool;
const db = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'doe'
});

// TEMPLATE ENGINE
const nunjucks = require('nunjucks');
nunjucks.configure("./", {
  express: server,
  noCache: true
});

server.get('/', function(req, res) {
  db.query("SELECT * from donors", function(err, result) {
    if (err)
      res.send('Erro de banco de dados');

    const donors = result.rows;
    return res.render('index.html', { donors: donors });
  });
});

server.post('/', function(req, res) {
  const { name, email, blood } = req.body;

  if (name === '' || email === '' || blood === '') {
    return res.send('Todos os campos são obrigatórios')
  } else {
    const query = `INSERT INTO donors ("name", "email", "blood") VALUES($1, $2, $3)`
    db.query(query, [name, email, blood], function(err) {
      if (err)
        return res.send('Erro no banco de dados');

      return res.redirect('/');
    });
  }
});

server.listen(3002);