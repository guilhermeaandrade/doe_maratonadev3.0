const express = require('express');
const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

const nunjucks = require('nunjucks');
nunjucks.configure("./", {
  express: server,
  noCache: true
});

const donors = [
  { name: 'Guilherme Andrade', blood: 'AB+' },
  { name: 'Diego Fernandes', blood: 'O-' },
  { name: 'Mayk Brito', blood: 'B+' },
  { name: 'Guilherme Andrade', blood: 'A-' },
];

server.get('/', function(req, res) {
  return res.render('index.html', { donors: donors });
});

server.post('/', function(req, res) {
  console.log(req.body);
  const { name, email, blood } = req.body;
  donors.push({
    name: name, blood: blood
  })
  return res.redirect('/');
});

server.listen(3002);