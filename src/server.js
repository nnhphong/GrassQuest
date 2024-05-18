const express = require('express')
const app = require('express')();
const server = require('http').createServer(app);
const {Server} = require("socket.io");
const { connectToDB, getDB } = require('./database')
const port = process.env.PORT || 3000;
const cors = require("cors");
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors());
var corsOptions = {
  origin: '*',
  optionsSucessStatus:200
}

app.use('/static', express.static('images')); // Can access images on react using the server's URL with /static/(img name)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

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

app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})

  

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

      var returnedData = {};
      var rad = Math.atan2(diffLon, diffLat);
      var deg = rad*(180/Math.pi);

      if(337.5 < deg  < 361 || 0 < deg < 22.5)
      {
        returnedData = "East";
      }
      else if(22.5 < deg < 67.5)
      {
        returnedData = "NorthEast";
      }
      else if(67.5 < deg < 112.5)
      {
        returnedData = "North";
      }
      else if(112.25 < deg < 157.5)
      {
        returnedData = "NorthWest";
      }
      else if(157.5 < deg < 202.5)
      {
        returnedData = "West";
      }
      else if(202.5 < deg < 247.5)
      {
        returnedData = "SouthWest";
      }
      else if(247.5 < deg < 292.5)
      {
        returnedData = "South";
      }
      else if(292.5 < deg < 337.5)
      {
        returnedData = "SouthEast";
      }
      else
      {
        returnedData = "oh crap";
      }


      socket.emit("returnedData", returnedData);
    });

  socket.on("requestNewQuest", (arg) =>
    {
      var newQuestInfo = {};
      newQuestInfo['DLat'] = Math.random()*180-90;
      newQuestInfo['DLon'] = Math.random()*360-180;
      socket.emit("newQuest", newQuestInfo);
    });


  socket.on("getUserData", (arg) =>{
     // arg is ltierally just an id/name

    var dData = {points:50, name:arg.name, exploredPlaces:["laz", "unionStationToronto", "acceleratorCenter"], photos:["/images/here"] };

    socket.emit("desiredUserData", dData);
  });

  socket.on("requestRankedLeaderboard", (arg) =>
    {
      console.log("hi");
      var tempData = db.collection("User info").find({}).sort({"points":-1}).limit(10);
      socket.emit("rankedLeaderboard", tempData);
    });


  socket.on('update-avatar',function(json){

    //variables
    var image = json.data.file;
    var data = image.replace(/^data:image\/\w+;base64,/, '');
    var fileName =  'user'+userid+Date.now() + "image.png";

    //upload to folder
    fs.writeFile("public/" + fileName, data, {encoding: 'base64'}, function(err){


      if(err){

        console.log(err);

      }else{

        //success
        //return image back to js-client
        io.to(socketid).emit('avatar-updated',{valid:'true',message:'success',buffer: data.toString('base64')
                                              });
      }
    });
  });

});
