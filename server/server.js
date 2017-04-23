const cors = require('cors');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app     = express();
const port    =   3000;

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true)
  },
  credentials: true
}));

app.use(bodyParser.json());

// ROUTES
// ==============================================

// we'll create our routes here
app.get('/playlists', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.sendFile(__dirname + '/playlists.json');
});

app.post('/xhrCreatePlaylist', (req, res) => {
  const data = fs.readFileSync(__dirname + '/playlists.json');
  const playlists = JSON.parse(data);
  const newPlaylist = req.body;

  playlists.push(newPlaylist);

  fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(playlists));

  res.send('OK')
});

app.post('/xhrDeletePlaylist', (req, res) => {
  const data = fs.readFileSync(__dirname + '/playlists.json');
  const playlists = JSON.parse(data);
  const index = req.body;

  playlists.splice(index, 1);

  fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(playlists));

  res.send('OK')
});

app.post('/xhrUpdateEditModePlaylist', (req, res) => {
  const data = fs.readFileSync(__dirname + '/playlists.json');
  const playlists = JSON.parse(data);
  const newPlaylists = req.body;

  fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(newPlaylists));

  res.send('OK')
});



// START THE SERVER
// ==============================================
app.listen(port, () => {
  console.log('Listening...')
});

