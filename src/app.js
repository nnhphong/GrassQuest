const express = require('express')
const app = express()
const port = 3000
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

// Uses jade to render jade files under `/views`
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Client side static assets will be under the  `/public` folder
app.use(express.static(__dirname + '/public'));

// To use them on the pages, like
// `localhsot:3000/images/flute.png` will be linked to `./public/images/flute.png`
app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

io.on('connection', (socket) =>{
  console.log("A connection!");
});

app.get('/playGame', (req, res) =>
{
  res.send('Backyard!')
})
