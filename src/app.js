const express = require('express')
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { connectToDB, getDB } = require('./database')

const port = process.env.PORT || 3000;

// db connection
let db
connectToDB((err) => { 
  if (err) {
    console.log(err)
  }
  else {
    db = getDB()
  }
})  

// Testing routes
app.get('/allDestination', (req, res) => {
  let allDestination = []
  db.collection("Destination")
    .find()
    .forEach(pic => allDestination.push(pic))
    .then(() => {
      res.status(200).json(allDestination)
    })
})

app.get('/addOne', (req, res) => {
  db.collection("User info")
    .insertOne({username: "UserX"})
    .then(() => {
      res.status(200).send('User added successfully')
    })
    .catch((error) => {
      res.status(500).send('Error added user')
    })
})

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


