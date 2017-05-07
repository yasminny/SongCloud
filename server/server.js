const cors = require('cors');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app     = express();
const port    =   3000;

const os = require('os');

fs.writeFileSync(os.tmpdir() + '/playlists.json', fs.readFileSync(__dirname + '/playlists.json'));

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
  res.sendFile(os.tmpdir() + '/playlists.json');
});

app.post('/xhrCreatePlaylist', (req, res) => {
  const data = fs.readFileSync(os.tmpdir() + '/playlists.json');
  const playlists = JSON.parse(data);
  const newPlaylist = req.body;

  playlists.push(newPlaylist);

  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(playlists));

  res.send('OK')
});

app.post('/xhrDeletePlaylist', (req, res) => {
  const data = fs.readFileSync(os.tmpdir() + '/playlists.json');
  const playlists = JSON.parse(data);
  const newPlaylists = req.body;

  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(newPlaylists));

  res.send('OK')
});

app.post('/xhrUpdateEditModePlaylist', (req, res) => {
  const data = fs.readFileSync(os.tmpdir() + '/playlists.json');
  const playlists = JSON.parse(data);
  const newPlaylists = req.body;

  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(newPlaylists));

  res.send('OK')
});

app.post('/xhrUpdatePlaylistTitle', (req, res) => {
  const data = fs.readFileSync(os.tmpdir() + '/playlists.json');
  const playlists = JSON.parse(data);
  const newPlaylists = req.body;

  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(newPlaylists));

  res.send('OK')
});

app.post('/xhrUpdateSongInPlaylist', (req, res) => {
  const data = fs.readFileSync(os.tmpdir() + '/playlists.json');
  const playlists = JSON.parse(data);
  const newPlaylists = req.body;

  fs.writeFileSync(os.tmpdir() + '/playlists.json', JSON.stringify(newPlaylists));

  res.send('OK')
});

const path = require('path');
app.get('/app.js', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/app.js')));
app.use('/_', express.static(path.resolve(__dirname, '../dist/_')));
app.get('/**', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

// START THE SERVER
// ==============================================
app.listen(port, () => {
  console.log('Listening...')
});

