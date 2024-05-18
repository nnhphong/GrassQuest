const express = require('express')
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

// Uses jade to render jade files under `/views`
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Client side static assets will be under the  `/public` folder
// To use them on the pages, like
// `localhsot:3000/images/flute.png` will be linked to `./public/images/flute.png`
app.use(express.static(__dirname + '/public'));




server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.render("home");
})

app.get('/playGame', (req, res) =>
{
  res.render('playGame', {userid:"helloworld"});
});

// Socket stuff
io.on('connection', (socket) =>{
  console.log("A connection!");
  socket.on("userConnected", (arg) =>
    {
      console.log("Client Connected" + arg);

      // Send them the position they need to navigate to
      var desiredPosition = {DLat : 50.0, DLon : 50.0};
      socket.emit("wantedPosition", desiredPosition ); // TODO: Make the function for this on client
    });

  // When a socket requests an update, an upadate will be provided
  socket.on("requestData", (arg) =>
    {
      console.log(arg);

      var diffLat = arg['LatiPosition'] - arg['desiredLat'];
      var diffLon = arg['LongPosition'] - arg['desiredLon'];
      socket.emit("returnedData", returnedData);
    });

});
